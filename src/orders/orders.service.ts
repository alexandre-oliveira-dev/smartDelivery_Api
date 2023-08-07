import { prismaClient } from "../prisma/prismaClient";
import { OrdersStatus } from "../../types/ordersStatus";
import { Prisma } from "@prisma/client";

class OrdersService {
  async create({
    amount,
    clientsId,
    companiesId,
    payment_method,
    status,
    order,
    amoutMoney,
    address,
    paymentVoucher,
  }: Prisma.OrdersCreateManyInput) {
    const createMany = await prismaClient.orders.create({
      data: {
        amount,
        clientsId,
        companiesId,
        payment_method,
        status,
        order,
        amoutMoney,
        address,
        paymentVoucher,
      },
      select: {
        id: true,
      },
    });
    return createMany;
  }

  async updateOrder(id: string, status: string) {
    const update = prismaClient.orders.update({
      where: {
        id,
      },
      data: {
        status,
      },
      select: {
        status: true,
      },
    });
    return update;
  }

  async updateManyByStatus() {
    const updateMany = prismaClient.orders.updateMany({
      where: {
        status: "entrega",
      },
      data: {
        status: "finalizado",
      },
    });
    return updateMany;
  }

  async findOrder(companiesId: string,id:string) {
    const find = await prismaClient.orders.findMany({
      where: {
        OR: [
          { companiesId },
          {id}
       ]
      },
      include: {
        client: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return find;
  }

  async findAllOrdersFinished({ status }: OrdersStatus, companiesId: string) {
    const allOrdersFinished = await prismaClient.orders.findMany({
      where: {
        companiesId,
        status: status.finalizado,
      },
    });
    return allOrdersFinished;
  }

  async deleteOrder(id: string) {
    const deleteorder = await prismaClient.orders.delete({
      where: {
        id,
      },
    });
    return deleteorder;
  }
}
export { OrdersService };
