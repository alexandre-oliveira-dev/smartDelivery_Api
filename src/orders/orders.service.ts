import { Prisma } from "../../../smartDelivery_database/node_modules/@prisma/client";
import { prismaClient } from "../prisma/prismaClient";
import { OrdersStatus } from "../../types/ordersStatus";

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
    pixType,
  }: Prisma.OrdersCreateManyInput) {
    const createMany = await prismaClient.orders.createMany({
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
        pixType,
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

  async findOrder(companiesId: string) {
    const find = await prismaClient.orders.findMany({
      where: {
        companiesId,
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
