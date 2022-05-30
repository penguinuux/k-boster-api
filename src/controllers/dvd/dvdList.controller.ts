import { Request, Response } from "express";
import { dvdListService } from "../../services/dvd";

const dvdListController = async (req: Request, res: Response) => {
  const dvds = await dvdListService();

  return res.status(201).json({ dvds });
};

export default dvdListController;
