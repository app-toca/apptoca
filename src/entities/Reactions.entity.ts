import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
  } from "typeorm";
  import { User } from "./User.entity";
import { Posts } from "./Posts.entity";
  
  @Entity("reactions")
  export class Reaction {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column("varchar", { length: 50 })
    type: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne((type) => User, (user) => user.reactions, {
        eager: true
    })
    user: User;
  
    @ManyToOne((type) => Posts, (posts) => posts.reactions)
    post: Posts;
  
}