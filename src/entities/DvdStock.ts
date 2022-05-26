import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Dvd } from "./Dvd";

@Entity("dvd_stocks")
export class DvdStock {
  @PrimaryGeneratedColumn("uuid")
  stock_id?: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @OneToOne(() => Dvd, (dvd) => dvd.dvd_stock)
  dvd: Dvd;
}
