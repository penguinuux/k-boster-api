import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id?: string;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin?: boolean;

  @OneToOne(() => Cart, (cart) => cart.user, { eager: true })
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };
}
