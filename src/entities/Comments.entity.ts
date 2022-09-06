import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar", { length: 500 })
  content: string;

  @ManyToOne((type) => Users, (users) => users.comments)
  users: Users;

  @ManyToOne((type) => Posts, (posts) => posts.comments)
  posts: Posts;
}
