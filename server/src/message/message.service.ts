import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Message } from "./message.entity";
import { User } from "src/user/user.entity";
import { Room } from "src/room/room.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  async create(
    content: string,
    username: string,
    room: Room
  ): Promise<Message> {
    const message = this.messageRepository.create({ content, username, room });
    return this.messageRepository.save(message);
  }

  async findByRoom(roomId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { room: { id: roomId } },
      relations: ["room"],
    });
  }
}
