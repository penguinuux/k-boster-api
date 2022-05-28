import { Request, Response } from "express";
import { userCartService } from "../../services/user";

const userCartController = async (req: Request, res: Response) => {
  const cart = await userCartService(req);

  return res.status(201).json({ cart });
};

export default userCartController;
