import {
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Organizations } from "./Organizations.entity";
import { Schedules } from "./Schedules.entity";
import { Meetings } from "./Meetings.entity";
import { Comments } from "./Comments.entity";
import { Area_users } from "./Area_users.entity";
import { Posts } from "./Posts.entity";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Image } from "./Image.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ nullable: false, type: "varchar" })
  @Exclude()
  password: string;

  @Column({ nullable: false, type: "integer" })
  year: number;

  @Column({ nullable: false, type: "varchar", length: 10 })
  course: string;

  @Column({ type: "varchar", length: 500 })
  phrase: string;

  @Column({ type: "boolean", nullable: false, default: false })
  is_adm: boolean;

  @Column({ type: "boolean", nullable: false, default: true })
  is_active: boolean;

  @Column("boolean", { default: false })
  is_owner: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Organizations, (organization) => organization.users, {
    eager: true,
  })
  organization: Organizations;

  @OneToMany(() => Schedules, (schedules) => schedules.user)
  schedule: Schedules;

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Area_users, (area_user) => area_user.user)
  area_user: Area_users[];

  @OneToMany(() => Meetings, (meeting) => meeting.user, {
    eager: true,
  })
  meetings: Meetings[];

  @OneToMany(() => Posts, (post) => post.user, {
    nullable: true,
  })
  posts: Posts[];

  @OneToOne(() => Image, {
    eager: true
  })
    @JoinColumn()
  img: Image;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
