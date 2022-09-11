import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("images")
export class Image {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({nullable: true})
    url?: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}