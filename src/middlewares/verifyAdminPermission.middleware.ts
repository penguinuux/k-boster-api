import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories";

const verifyAdminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.decoded.is_admin) {
    next();
  } else {
    return res.status(403).json({ message: "Missing admin permission." });
  }
};

export default verifyAdminPermission;
