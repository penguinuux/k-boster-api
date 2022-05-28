import { AssertsShape } from "yup/lib/object";
import { Request } from "express";
import { dvdRepository } from "../../repositories";
import { Dvd } from "../../entities";
import { serializedCreatedDvdSchema } from "../../schemas/dvd";

const dvdListService = async (): Promise<AssertsShape<any>> => {
  const dvds = await dvdRepository.all();

  return await serializedCreatedDvdSchema.validate(dvds, {
    stripUnknown: true,
  });
};

export default dvdListService;
