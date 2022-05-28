import { Request, Response } from "express";
import { dvdCreateService } from "../../services/dvd";

const dvdCreateController = async (req: Request, res: Response) => {
  const dvds = await dvdCreateService(req);

  return res.status(201).json({ dvds });
};

export default dvdCreateController;
