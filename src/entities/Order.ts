import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  order_id?: string;

  @Column({ type: "float" })
  total: number;

  @CreateDateColumn()
  created_at?: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  user: User;

  @ManyToMany(() => Dvd, { nullable: true, eager: true })
  @JoinColumn()
  dvds: Dvd[];
}
