import { prismaClient } from "../prisma/prismaClient";
import { OrdersStatus, Prisma } from "@prisma/client";

class OrdersService {
  async createOrder({
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

  async updateOrder(id: string, status: OrdersStatus) {
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

  async updateAllOrdersByStatus(args: Prisma.OrdersUpdateManyArgs) {
    const updateMany = prismaClient.orders.updateMany({
      where: {
        companiesId: args.data?.companiesId as string,
        status: OrdersStatus.entrega,
      },
      data: {
        status: OrdersStatus.finalizado,
      },
    });
    return updateMany;
  }

  async findOrders(companiesId: string, id: string) {
    const find = await prismaClient.orders.findMany({
      where: {
        OR: [{ companiesId }, { id }],
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

  async findAllOrdersFinished(companiesId: string) {
    const allOrdersFinished = await prismaClient.orders.findMany({
      where: {
        companiesId,
        status: OrdersStatus.finalizado,
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
