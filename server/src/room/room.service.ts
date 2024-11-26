import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "./room.entity";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async create(name: string): Promise<Room> {
    const existingRoom = await this.roomRepository.findOne({ where: { name } });
    if (existingRoom) {
      throw new Error("Room with this name already exists");
    }

    const room = this.roomRepository.create({ name });
    return this.roomRepository.save(room);
  }
}
