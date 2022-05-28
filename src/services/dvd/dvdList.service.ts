import { AssertsShape } from "yup/lib/object";
import { Request } from "express";
import { dvdRepository } from "../../repositories";
import { Dvd } from "../../entities";

const dvdListService = async (): Promise<Dvd[]> => {
  const dvds = await dvdRepository.all();

  return dvds;
};

export default dvdListService;
