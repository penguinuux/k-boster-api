import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { DvdStock } from "../entities";

interface IDvdStockRepo {
  save: (stock: Partial<DvdStock>) => Promise<DvdStock>;
  all: () => Promise<DvdStock[]>;
  findOne: (payload: object) => Promise<DvdStock>;
}

class DvdStockRepo implements IDvdStockRepo {
  private ormRepo: Repository<DvdStock>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(DvdStock);
  }

  save = async (DvdStock: Partial<DvdStock>) =>
    await this.ormRepo.save(DvdStock);

  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
}

export default new DvdStockRepo();
