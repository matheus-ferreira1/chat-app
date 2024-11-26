import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  username: string;

  @ManyToOne(() => Room, (room) => room.id, { nullable: false })
  @JoinColumn({ name: "room_id" })
  room: Room;
}
