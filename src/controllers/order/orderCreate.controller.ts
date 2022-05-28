import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { orderCreateService } from "../../services/order";

const orderCreateController = async (req: Request, res: Response) => {
  try {
    const order = await orderCreateService(req);

    return res.status(201).json(order);
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(error, res);
    } else {
      return res.status(422).json({ message: error.message });
    }
  }
};

export default orderCreateController;
