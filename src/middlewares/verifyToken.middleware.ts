import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization token" });
  }

  return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({ name: error.name, message: error.message });
    }

    req.decoded = decoded as Partial<User>;

    return next();
  });
};

export default verifyToken;
