import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  monday: string;

  @Column()
  tuesday: string;

  @Column()
  wednesday: string;

  @Column()
  thursday: string;

  @Column()
  friday: string;

  @Column()
  saturday: string;

  @Column()
  sunday: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
