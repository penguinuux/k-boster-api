import { Request } from "express";
import { cartRepository, userRepository } from "../../repositories";
import { serializeCartSchema } from "../../schemas/cart";

const userCartService = async ({ decoded }: Request) => {
  const user = await userRepository.findOne({ email: decoded.email });

  return await serializeCartSchema.validate(user.cart, { stripUnknown: true });
};

export default userCartService;
