import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities";

interface IDvdRepo {
  save: (dvd: Partial<Dvd>) => Promise<Dvd>;
  saveMany: (dvd: Partial<Dvd[]>) => Promise<Dvd[]>;
  all: () => Promise<Dvd[]>;
  findOne: (payload: object) => Promise<Dvd>;
}

class DvdRepo implements IDvdRepo {
  private ormRepo: Repository<Dvd>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Dvd);
  }

  save = async (dvd: Partial<Dvd>) => await this.ormRepo.save(dvd);

  saveMany = async (dvds: Dvd[]) => {
    const insertedDvds = await this.ormRepo
      .createQueryBuilder()
      .insert()
      .values(dvds)
      .execute();

    const returnDvds: Dvd[] = [];

    for (let { dvd_id } of insertedDvds.generatedMaps) {
      returnDvds.push(await this.findOne({ dvd_id }));
    }

    return returnDvds;
  };

  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
}

export default new DvdRepo();
