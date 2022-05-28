import { Request, Response } from "express";
import { userCreateService } from "../../services/user";

const userCreateController = async (req: Request, res: Response) => {
  const user = await userCreateService(req);

  return res.status(201).json(user);
};

export default userCreateController;
