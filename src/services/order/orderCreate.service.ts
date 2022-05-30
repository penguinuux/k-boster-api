import { Request } from "express";
import {
  cartRepository,
  orderRepository,
  userRepository,
} from "../../repositories";
import { serializedOrderCreateSchema } from "../../schemas/order";

const orderCreateService = async ({ decoded }: Request) => {
  const user = await userRepository.findOne({ email: decoded.email });
  const cart = await cartRepository.findOne({ cart_id: user.cart.cart_id });

  if (cart.dvds.length === 0) {
    throw new Error("The cart is empty");
  }

  const order = await orderRepository.save({
    total: cart.total,
    user: user,
    dvds: cart.dvds,
  });

  cart.total = 0;
  cart.dvds = [];
  await cartRepository.save(cart);

  return serializedOrderCreateSchema.validate(order, { stripUnknown: true });
};

export default orderCreateService;
