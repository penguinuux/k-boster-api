import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
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

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Dvd, (dvd) => dvd.orders, { nullable: true })
  @JoinTable()
  dvds: Dvd[];
}
