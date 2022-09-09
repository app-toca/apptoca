import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Days } from "./Days.entity";
import { Hours } from "./Hours.entity";
import { User } from "./User.entity";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => User, (user) => user.schedule)
  user: User;

  @OneToOne(() => Days)
  @JoinColumn()
  day: Days;

  @OneToOne(() => Hours)
  @JoinColumn()
  hour: Hours;
}
