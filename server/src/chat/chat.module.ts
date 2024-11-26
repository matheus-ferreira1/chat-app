import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { UserModule } from "src/user/user.module";
import { MessageModule } from "src/message/message.module";
import { ChatController } from "./chat.controller";
import { RoomModule } from "src/room/room.module";

@Module({
  imports: [UserModule, MessageModule, RoomModule],
  providers: [ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
