import { Request, Response } from "express";
import { userOrdersListService } from "../../services/user";

const userOrdersListController = async (req: Request, res: Response) => {
  const orders = await userOrdersListService(req);

  return res.status(201).json({ orders });
};

export default userOrdersListController;
