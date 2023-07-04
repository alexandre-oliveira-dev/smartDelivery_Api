import { Request, Response } from "express";
import { OrdersService } from "./orders.service";
import { Prisma } from "@prisma/client";

const service = new OrdersService();

class OrdersResolver {
  async create(req: Request, res: Response) {
    const {
      amount,
      clientsId,
      companiesId,
      payment_method,
      status,
      order,
    }: Prisma.OrdersCreateManyInput = req.body;

    const create = await service.create({
      amount,
      clientsId,
      companiesId,
      payment_method,
      status,
      order,
    });
    return res.json(create);
  }

  async update(req: Request, res: Response){
    const {status} = req.body
    const {id} = req.params

    const update = await service.updateOrder(id,status)
    return res.json(update)
  }

  async findOrder(req: Request, res: Response){
    const {clientsId,companiesId} = req.query
    const find = await service.findOrder(String(clientsId),String(companiesId))
    return res.json(find)
  }
  async findAllOrdersFinished(req: Request, res: Response){
    const {status,companiesId} = req.query

    const find = await service.findOrder(String(status),String(companiesId))
    return res.json({...find, total:find.length})
  }
  async del(req: Request, res: Response){
    const {id} = req.params
    await service.deleteOrder(id)
    return res.status(200)
  }
}
export { OrdersResolver };
