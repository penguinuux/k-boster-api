import { NextFunction, Request, Response } from "express";
import { IDvdCreate } from "../interfaces";
import { dvdRepository } from "../repositories";

const verifyDvdUnicity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dvds } = req.validated as IDvdCreate;

  const dvdAlreadyExists = [];

  for (let dvd of dvds) {
    const foundDvd = await dvdRepository.findOne({ name: dvd.name });
    if (foundDvd) {
      dvdAlreadyExists.push(dvd.name);
    }
  }

  if (dvdAlreadyExists.length > 0) {
    return res.status(409).json({
      message: `Dvds '${dvdAlreadyExists.join(", ")}' already registered`,
    });
  }

  return next();
};

export default verifyDvdUnicity;
