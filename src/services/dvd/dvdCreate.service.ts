import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { Dvd } from "../../entities";
import { IDvdCreate } from "../../interfaces";
import { dvdRepository, dvdStockRepository } from "../../repositories";

const dvdCreateService = async ({
  validated,
}: Request): Promise<AssertsShape<any>> => {
  const { dvds } = validated as IDvdCreate;

  const registeredDvds: Dvd[] = [];

  for (let dvd of dvds) {
    const { price, quantity } = dvd;
    const dvdStock = await dvdStockRepository.save({ price, quantity });
    const newDvd = await dvdRepository.save({ ...dvd, dvd_stock: dvdStock });
    registeredDvds.push(newDvd);
  }

  return registeredDvds;
};

export default dvdCreateService;
