import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Organizations } from "./Organizations.entity";
import { Area_users } from "./Area_users.entity";
import { Meetings } from "./Meetings.entity";
import { Posts } from "./Posts.entity";

@Entity("areas")
export class Areas {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Organizations)
  organization: string;

  @OneToMany(() => Area_users, (area_user) => area_user.area, {
    eager: true,
  })
  area_user: Area_users;

  @OneToMany(() => Meetings, (meetings) => meetings.area, {
    eager: true,
  })
  meetings: Meetings[];

  @OneToMany(() => Posts, (posts) => posts.area, {
    eager: true,
  })
  posts: Posts[];
}
