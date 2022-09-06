import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Organizations } from "./Organizations.entity";
import { Area_users } from "./Area_users.entity";
import { Meetings } from "./meetings.entity";

@Entity("areas")
export class Areas {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Organizations)
  organization_id: string;

  @OneToMany(() => Area_users, (area_user) => area_user.area_id, {
    eager: true,
  })
  area_user: Area_users[];

  @OneToMany(() => Meetings, (meetings) => meetings.area, {
    eager: true,
  })
  meetings: Meetings[];

  @OneToMany(() => posts, (posts) => posts.area_id)
  posts: Posts[];
}