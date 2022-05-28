import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { userLoginService } from "../../services/user";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const token = await userLoginService(req);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return handleError(error, res);
    }
  }
};

export default userLoginController;
