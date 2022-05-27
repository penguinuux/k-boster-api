import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser = await userRepository.findOne({
    email: req.body.email,
  });

  if (foundUser) {
    return res.status(409).json({ message: "Email already exists." });
  }

  return next();
};

export default verifyUserExists;
