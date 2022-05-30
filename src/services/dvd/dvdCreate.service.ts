import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import { Dvd } from "../../entities";
import { IDvdCreate } from "../../interfaces";
import { dvdRepository, dvdStockRepository } from "../../repositories";
import { serializedCreatedDvdSchema } from "../../schemas/dvd";

const dvdCreateService = async ({
  validated,
}: Request): Promise<AssertsShape<any>> => {
  const { dvds } = validated as IDvdCreate;

  const registeredDvds: Dvd[] = [];

  for (let dvd of dvds) {
    const { price, quantity, ...newDvd } = dvd;
    const dvdStock = await dvdStockRepository.save({ price, quantity });
    const createdDvd = await dvdRepository.save({
      ...newDvd,
      dvd_stock: dvdStock,
    });
    registeredDvds.push(createdDvd);
  }

  return serializedCreatedDvdSchema.validate(registeredDvds, {
    stripUnknown: true,
  });
};

export default dvdCreateService;
