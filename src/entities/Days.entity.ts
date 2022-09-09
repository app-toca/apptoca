import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import { Schedules } from "./Schedules.entity";

@Entity("days")
export class Days {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({  })
    name: number;

    @OneToOne(() => Schedules)
    @JoinColumn()
    schedule: Schedules;
}