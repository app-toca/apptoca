import { Entity, UpdateDateColumn, CreateDateColumn, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    surname: string;

    @Column({ type: "integer" })
    age: number;

    @Column({ nullable: false, type: "varchar" })
    password: string;

    @Column({ nullable: false, type: "integer" })
    year: number;

    @Column({ nullable: false, type: "varchar", length: 10 })
    course: string;

    @Column({ type: "varchar", length: 500 })
    phrase: string;

    @Column({ type: "boolean", nullable: false })
    isAdm: boolean;

    @Column({ type: "boolean", nullable: false })
    isActive: boolean;

    @Column({ type: "varchar" })
    img: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Organizations)
    @JoinColumn()
    organization: Organizations

    @OneToOne(() => Schedules)
    @JoinColumn()
    schedule: Schedules
}
