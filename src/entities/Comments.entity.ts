import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Posts } from "./Posts.entity";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 500 })
  content: string;

  @ManyToOne((type) => User, (user) => user.comments)
  user: User;

  @ManyToOne((type) => Posts, (post) => post.comments)
  post: Posts;
}
