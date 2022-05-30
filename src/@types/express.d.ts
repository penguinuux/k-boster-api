import { Dvd, User } from "../entities";
import { IDvdCreate } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | IDvdCreate;
      decoded: Partial<User>;
      dvdToBuy: Dvd;
    }
  }
}
