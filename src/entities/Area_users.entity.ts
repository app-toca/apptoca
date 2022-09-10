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

  @ManyToOne((type) => Areas, (area) => area.area_user, {
    eager: true,
  })
  area: Areas;

  @ManyToOne((type) => User, (user) => user.area_user, {
    eager: true,
  })
  user: User;
}
