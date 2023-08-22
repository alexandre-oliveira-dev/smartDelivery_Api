import { Request, Response } from "express";
import { ClientsService } from "./clients.service";
import { Prisma } from "@prisma/client";

const service = new ClientsService();
class ClientsResolver {
  async create(req: Request, res: Response) {
    const { email, name, phone }: Prisma.ClientsCreateManyInput = req.body;
    const create = await service.create({ email, name, phone });
    return res.json(create).status(200);
  }
}
export { ClientsResolver };
