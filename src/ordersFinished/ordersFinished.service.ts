import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/prismaClient";

class OrdersFinished {
  async create({
    amountOrders,
    amountvalue,
    date,
    companyId,
  }: Prisma.OrdersFinishedCreateManyInput) {
    const orderEcxists = await prismaClient.ordersFinished.findFirst({
      where: {
        date,
      },
    });
    if (orderEcxists) return null;
    const create = await prismaClient.ordersFinished.create({
      data: {
        amountOrders,
        amountvalue,
        date,
        companyId,
      },
    });
    return create;
  }
  async findAll(companyId: string) {
    const find = await prismaClient.ordersFinished.findMany({
      where: {
        companyId,
      },
    });
    return find;
  }
}
export { OrdersFinished };
