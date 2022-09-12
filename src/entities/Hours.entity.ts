import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Schedules } from "./Schedules.entity";

@Entity("hours")
export class Hours {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({  })
    hour: string;
}