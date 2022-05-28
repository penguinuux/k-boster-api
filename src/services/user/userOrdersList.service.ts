import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { userRepository } from "../../repositories";

const userOrdersListService = async ({
  decoded,
}: Request): Promise<AssertsShape<any>> => {
  const user = await userRepository.findOne({ email: decoded.email });

  return user.orders;
};

export default userOrdersListService;
