import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Organizations } from "./Organizations";
import { Area_users } from "./Area_users";

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
  area_user: area_users[];

  @OneToMany(() => Meetings, (meetings) => meetings.area_id, {
    eager: true,
  })
  meetings: Meetings[];

  @OneToMany(() => posts, (posts) => posts.area_id)
  posts: Posts[];
}
