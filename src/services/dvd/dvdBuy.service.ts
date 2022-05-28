import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { Cart, User } from "../../entities";
import { AppError } from "../../errors/appError";
import { cartRepository, userRepository } from "../../repositories";
import { serializedBuyDvdSchema } from "../../schemas/cart";

const dvdBuyService = async ({
  body,
  decoded,
  dvdToBuy,
}: Request): Promise<AssertsShape<any>> => {
  const user: User = await userRepository.findOne({ email: decoded.email });
  const cart: Cart = await cartRepository.findOne({
    cart_id: user.cart.cart_id,
  });

  if (body.quantity > dvdToBuy.dvd_stock.quantity) {
    throw new AppError(
      422,
      `current stock: ${dvdToBuy.dvd_stock.quantity}, received demand ${body.quantity}`
    );
  }

  const subTotal = dvdToBuy.dvd_stock.price * body.quantity;
  cart.dvds = [...user.cart.dvds, dvdToBuy];
  cart.total += subTotal;

  await cartRepository.save(cart);

  return await serializedBuyDvdSchema.validate(cart, {
    stripUnknown: true,
  });
};

export default dvdBuyService;
