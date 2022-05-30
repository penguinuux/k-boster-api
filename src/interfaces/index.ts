import { Dvd } from "../entities";

export interface IDvd {
  name: string;
  duration: string;
  quantity: number;
  price: number;
}
export interface IDvdCreate {
  dvds: IDvd[];
}

export interface IDvdList {
  dvds: Dvd[];
}
