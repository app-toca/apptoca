import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, OneToMany} from "typeorm";
import { Areas } from "./Areas";

@Entity("posts")
export class Posts{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column("varchar", { length: 1000 })
    content: string

    @CreateDateColumn("datetime")
    created_at: Date

    @UpdateDateColumn("datetime")
    updated_at: Date

    @ManyToOne(type => User, user => user.meetings)
    user: User

    @ManyToOne(type => Areas, areas => areas.meetings)
    area: Areas

    @OneToMany(type => Comments, comments => comments.posts, {
        eager: true
    })
    comments: Comments[]

    @OneToMany(type => Reactions, reactions => reactions.posts, {
        eager:true
    })
    reactions: Reactions[]
}