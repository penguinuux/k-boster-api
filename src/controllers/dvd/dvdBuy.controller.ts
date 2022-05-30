import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { dvdBuyService } from "../../services/dvd";

const dvdBuyController = async (req: Request, res: Response) => {
  try {
    const user = await dvdBuyService(req);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(error, res);
    }
  }
};

export default dvdBuyController;
