import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Areas } from "./Areas.entity";
import { User } from "./User.entity";

@Entity("organizations")
export class Organizations {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Areas, (areas) => areas.organization)
  areas: Areas[];

  @OneToMany(() => User, (users) => users.organization)
  users: User[];
}
