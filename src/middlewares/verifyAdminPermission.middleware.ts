import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories";

const verifyAdminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = await userRepository.findOne({
    email: req.decoded.email,
  });

  if (decodedUser.is_admin) {
    next();
  } else {
    return res.status(403).json({ message: "Missing admin permission." });
  }
};

export default verifyAdminPermission;
