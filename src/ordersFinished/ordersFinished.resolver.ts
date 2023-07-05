import { Request, Response } from "express";
import { OrdersFinished } from "./ordersFinished.service";
import { Prisma } from "@prisma/client";

const service = new OrdersFinished();

class OrdersFinishedResolver {
  async create(req: Request, res: Response) {
    const { amountOrders, amountvalue, companyId, date }: Prisma.OrdersFinishedCreateManyInput =
      req.body;
    await service.create({ amountOrders, amountvalue, companyId, date });
    return res.json().status(200);
  }

  async find(req: Request, res: Response) {
    const { companyId } = req.params;

    const response = await service.findAll(companyId);
    return res.json(response);
  }
}

export {OrdersFinishedResolver}