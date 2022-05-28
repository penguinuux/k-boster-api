import { NextFunction, Request, Response } from "express";
import { dvdRepository } from "../repositories";

const verifyDvdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundDvd = await dvdRepository.findOne({
      dvd_id: req.params.dvdId,
    });
    if (!foundDvd) {
      return res.status(404).json({ message: "Dvd not found" });
    }

    req.dvdToBuy = foundDvd;
  } catch (error) {
    res.status(400).json({ message: "Invalid dvd id" });
  }

  return next();
};

export default verifyDvdExists;
