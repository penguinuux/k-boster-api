import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Cart } from "./Cart";
import { DvdStock } from "./DvdStock";
import { Order } from "./Order";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  dvd_id?: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @ManyToMany(() => Cart, (cart) => cart.dvds)
  carts: Cart[];

  @ManyToMany(() => Order, (order) => order.dvds, { eager: true })
  orders: Order[];

  @OneToOne(() => DvdStock, (dvdStock) => dvdStock.dvd, { eager: true })
  @JoinColumn()
  dvd_stock: DvdStock;
}
