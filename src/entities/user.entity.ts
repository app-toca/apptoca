import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Organizations } from "./Organizations.entity";
import { Schedules } from "./schedules.entity";
import { Meetings } from "./Meetings.entity";
import { Comments } from "./Comments.entity";
import { Area_users } from "./Area_users.entity";
import { Posts } from "./Posts.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ nullable: false, type: "varchar" })
  password: string;

  @Column({ nullable: false, type: "integer" })
  year: number;

  @Column({ nullable: false, type: "varchar", length: 10 })
  course: string;

  @Column({ type: "varchar", length: 500 })
  phrase: string;

  @Column({ type: "boolean", nullable: false })
  is_adm: boolean;

  @Column({ type: "boolean", nullable: false })
  is_active: boolean;

  @Column({ type: "varchar" })
  img: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Organizations)
  @JoinColumn()
  organization: Organizations;

  @OneToMany(() => Schedules, schedules => schedules.user_id)
  schedule: Schedules;

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Area_users, (area_user) => area_user.user, {
    eager: true,
  })
  area_user: Area_users[];

  @OneToMany(() => Meetings, (meeting) => meeting.user, {
    eager: true,
  })
  meetings: Meetings[];

  @OneToMany(() => Posts, (post) => post.user, {
  nullable: true,
  })
  posts: Posts[];
}
