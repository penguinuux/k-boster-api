import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities";

const verifyCreateAdminUserPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (_, decoded) => {
    req.decoded = decoded as Partial<User>;
  });

  if (req.body.is_admin) {
    if (token) {
      if (req.decoded.is_admin) {
        return next();
      } else {
        return res.status(403).json({ message: "Missing admin permission" });
      }
    } else {
      return res.status(401).json({ message: "Missing authorization token" });
    }
  } else {
    return next();
  }
};

export default verifyCreateAdminUserPermission;
