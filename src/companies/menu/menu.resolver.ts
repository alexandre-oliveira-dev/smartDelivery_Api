import { Request, Response } from "express";
import { MenuService } from "./menu.service";
import { Prisma } from "@prisma/client";

const service = new MenuService();

class MenuResolver {
  async create(req: Request, res: Response) {
    const { title, companiesId, price, amount, weight,categoria }: Prisma.MenuOfCompaniesCreateManyInput =
      req.body;

    const request = await service.create({
      title,
      price,
      amount,
      companiesId,
      weight,
      categoria
    });
    return res.json(request);
  }

  async findMany(req: Request, res: Response) {
    const { companiesId } = req.params;

    const response = await service.findMany(companiesId);
    return res.json(response);
  }
  async findUnique(req: Request, res: Response) {
    const { param} = req.params;
    const response = await service.findUnique(param);
    return res.json(response);
  }
  async del(req: Request, res: Response) {
    const { id } = req.params;

    const response = await service.del(id);
    return res.json(response);
  }
  async update(req: Request, res: Response) {
    const {
      data: { categoria, amount, price, title, weight },
    }: Prisma.MenuOfCompaniesUpdateManyArgs = req.body;
    const { id } = req.params;

    const response = await service.update(id, {
      data: { categoria, amount, price, title, weight },
    });
    return res.json(response);
  }
}

export { MenuResolver };
