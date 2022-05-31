import { Request } from "express";
import { User } from "../../entities";
import { AppError } from "../../errors/appError";
import { userRepository } from "../../repositories";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const userLoginService = async ({ validated }: Request): Promise<string> => {
  const user: User = await userRepository.findOne({
    email: (validated as User).email,
  });

  if (!user) {
    throw new AppError(403, "Invalid credentials.");
  }

  if (!(await user.comparePwd((validated as User).password))) {
    throw new AppError(403, "Invalid credentials.");
  }

  const token: string = jwt.sign(
    { email: (validated as User).email, is_admin: user.is_admin },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRES_IN }
  );

  return token;
};

export default userLoginService;
