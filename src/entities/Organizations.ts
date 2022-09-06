import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Areas } from "./Areas";

@Entity()
export class Organizations {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Areas, (areas) => areas.organization_id, {
    eager: true,
  })
  areas: Areas[];
}
