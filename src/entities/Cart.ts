import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  cart_id?: string;

  @Column({ default: false })
  paid?: boolean;

  @Column({ type: "float" })
  total: number;

  @OneToOne(() => User, (user) => user.cart, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Dvd, (dvd) => dvd.carts, { nullable: true })
  @JoinTable()
  dvds: Dvd[];
}
