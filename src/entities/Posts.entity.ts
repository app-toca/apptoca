import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User.entity";
import { Comments } from "./Comments.entity";
import { Areas } from "./Areas.entity";

@Entity("posts")
export class Posts {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 1000 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @ManyToOne((type) => Areas, (areas) => areas.posts)
  area: Areas;

  @OneToMany((type) => Comments, (comments) => comments.post, {
    eager: true,
  })
  comments: Comments[];
}

//@OneToMany((type) => Reactions, (reactions) => reactions.posts, {
//     eager: true,
//   })
//   reactions: Reactions[];
