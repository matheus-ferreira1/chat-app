import { Controller, Get } from "@nestjs/common";

@Controller("chat")
export class ChatController {
  private rooms = ["general", "random", "tech"];

  @Get("rooms")
  getRooms() {
    return this.rooms;
  }
}
