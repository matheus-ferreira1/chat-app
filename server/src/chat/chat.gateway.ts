import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { UserService } from "src/user/user.service";
import { MessageService } from "src/message/message.service";
import { RoomService } from "src/room/room.service";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  constructor(
    private readonly roomService: RoomService,
    private readonly messageService: MessageService
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log(`Client disconnected: ${client.id}`);
  }

  /////////////////////////////////////////////////////

  @SubscribeMessage("setUsername")
  handleSetUsername(client: Socket, username: string) {
    const uniqueUsername = `${username}-${Math.random().toString(36).substring(7)}`;
    this.users.set(client.id, uniqueUsername);
    client.emit("usernameSet", uniqueUsername);
  }

  @SubscribeMessage("getRooms")
  async handleGetRooms(client: Socket) {
    const rooms = await this.roomService.findAll();
    client.emit("rooms", rooms);
  }

  @SubscribeMessage("createRoom")
  async handleCreateRoom(client: Socket, roomName: string) {
    try {
      await this.roomService.create(roomName);
      this.server.emit("rooms", await this.roomService.findAll());
    } catch (error) {
      client.emit("error", error.message);
    }
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, roomName: string) {
    const username = this.users.get(client.id);
    const room = (await this.roomService.findAll()).find(
      (r) => r.name === roomName
    );
    if (room) {
      client.join(room.name);
      this.server.to(room.name).emit("message", {
        user: "System",
        text: `${username} joined room ${room.name}`,
      });
    } else {
      client.emit("error", "Room not found");
    }
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, roomName: string) {
    const username = this.users.get(client.id);
    const room = (await this.roomService.findAll()).find(
      (r) => r.name === roomName
    );
    if (room) {
      client.leave(room.name);
      client.broadcast.emit("message", {
        user: "System",
        text: `${username} left room ${room.name}`,
      });
    } else {
      client.emit("error", "Room not found");
    }
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    client: Socket,
    { roomName, content }: { roomName: string; content: string }
  ) {
    const username = this.users.get(client.id);
    const room = (await this.roomService.findAll()).find(
      (r) => r.name === roomName
    );
    if (room) {
      const message = await this.messageService.create(content, username, room);
      this.server.to(room.name).emit("message", message);
    } else {
      client.emit("error", "Room not found");
    }
  }

  @SubscribeMessage("newMessage")
  async handleNewMessage(
    client: Socket,
    payload: { roomName: string; message: { user: string; text: string } }
  ) {
    const newMessage = {
      user: this.users.get(client.id),
      text: payload.message.text,
    };
    this.server.emit("message", newMessage);
  }
}
