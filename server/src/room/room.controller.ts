import { Body, ConflictException, Controller, Get, Post } from "@nestjs/common";
import { RoomService } from "./room.service";
import { Room } from "./room.entity";

@Controller("rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Post()
  async createRoom(@Body() body: { name: string }): Promise<Room> {
    const { name } = body;

    try {
      return await this.roomService.create(name);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException("Room with this name already exists.");
      }
      throw error;
    }
  }
}
