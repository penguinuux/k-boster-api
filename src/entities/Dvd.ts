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

  @ManyToMany(() => Cart, {
    eager: true,
  })
  @JoinColumn()
  carts: Cart[];

  @ManyToMany(() => Order, {
    eager: true,
  })
  @JoinColumn()
  orders: Order[];

  @OneToOne(() => DvdStock, (dvdStock) => dvdStock.dvd)
  dvd_stock: DvdStock;
}
