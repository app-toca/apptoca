import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity("meetings")
export class Meetings{
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

    @ManyToOne(type => Area, area => area.meetings)
    area: Area

}