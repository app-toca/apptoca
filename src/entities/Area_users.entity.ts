import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Areas } from "./Areas.entity";
import { User } from "./User.entity";

@Entity("area_users")
export class Area_users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Areas, (area) => area.area_user)
  area_id: Areas;

  @ManyToOne((type) => User, (user) => user.area_user)
  user_id: User;
}
