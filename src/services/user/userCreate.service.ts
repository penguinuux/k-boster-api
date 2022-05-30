import { hash } from "bcrypt";
import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { Cart, User } from "../../entities";
import { cartRepository, userRepository } from "../../repositories";
import { serializedCreatedUserSchema } from "../../schemas/user";

const userCreateService = async ({
  validated,
}: Request): Promise<AssertsShape<any>> => {
  (validated as User).password = await hash((validated as User).password, 10);

  const user: User = await userRepository.save(validated as User);
  const cart: Cart = await cartRepository.save({ total: 0, user: user });

  return await serializedCreatedUserSchema.validate(user, {
    stripUnknown: true,
  });
};

export default userCreateService;
