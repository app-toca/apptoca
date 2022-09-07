import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Schedules } from "./schedules.entity";

@Entity("hours")
export class Hours {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({  })
    hour: string;

    @OneToOne(() => Schedules)
    @JoinColumn()
    schedule: Schedules;
}