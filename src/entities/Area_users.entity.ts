import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Areas } from "./Areas.entity";

@Entity("area_users")
export class Area_users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Areas, (area) => area.area_user)
  area_id: Areas;

  @ManyToOne((type) => Users, (user) => user.area_user)
  user_id: Users;
}
