import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { userRepository } from "../../repositories";
import { serializedOrderListSchema } from "../../schemas/order";

const userOrdersListService = async ({
  decoded,
}: Request): Promise<AssertsShape<any>> => {
  const user = await userRepository.findOne({ email: decoded.email });

  return await serializedOrderListSchema.validate(user.orders, {
    stripUnknown: true,
  });
};

export default userOrdersListService;
