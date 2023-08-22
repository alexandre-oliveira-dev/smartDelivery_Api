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
      amoutMoney,
      address,
    }: Prisma.OrdersCreateManyInput = req.body;

    const create = await service.createOrder({
      amount,
      clientsId,
      companiesId,
      payment_method,
      status,
      order,
      amoutMoney,
      address,
    });
    return res.json(create).status(200);
  }

  async update(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;

    const update = await service.updateOrder(id, status);
    return res.json(update);
  }
  async updateAllOrdersByStatus(req: Request, res: Response) {
    const { companiesId } = req.params;
    await service.updateAllOrdersByStatus(companiesId as unknown as Prisma.OrdersUpdateManyArgs);
    return res.json().status(200);
  }

  async findOrder(req: Request, res: Response) {
    const { companiesId, id } = req.query;
    const find = await service.findOrders(String(companiesId), String(id));
    return res.json(find);
  }
  async findAllOrdersFinished(req: Request, res: Response) {
    const { companiesId } = req.query;

    const find = await service.findAllOrdersFinished(String(companiesId));
    return res.json({ ...find, total: find.length });
  }
  async del(req: Request, res: Response) {
    const { id } = req.params;
    await service.deleteOrder(id);
    return res.status(200);
  }
}
export { OrdersResolver };
