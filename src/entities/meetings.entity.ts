import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Areas } from "./Areas";

@Entity("posts")
export class Posts{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column("varchar", { length: 500 })
    description: string

    @CreateDateColumn("datetime")
    created_at: Date

    @Column("varchar")
    ata: string

    @ManyToOne(type => User, user => user.meetings)
    user: User

    @ManyToOne(type => Areas, areas => areas.meetings)
    area: Areas

}