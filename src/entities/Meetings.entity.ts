import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Areas } from "./Areas.entity";
import { User } from "./User.entity";

@Entity("meetings")
export class Meetings {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 500 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({type: 'timestamptz'})
  date_time: Date

  @Column()
  duration: string

  @Column("varchar")
  ata: string;

  @ManyToOne((type) => User, (user) => user.meetings)
  user: User;

  @ManyToOne((type) => Areas, (areas) => areas.meetings)
  area: Areas;
}
