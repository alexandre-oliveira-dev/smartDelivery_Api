import { Prisma } from "@prisma/client";
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
    amoutMoney
  }: Prisma.OrdersCreateManyInput) {
    const createMany = await prismaClient.orders.createMany({
      data: {
        amount,
        clientsId,
        companiesId,
        payment_method,
        status,
        order,
        amoutMoney
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

  async findOrder(companiesId: string) {
    const find = await prismaClient.orders.findMany({
      where: {
        companiesId,
      },
      include:{
        client:{
          select:{
            name:true,
            email:true,
            phone:true,
          }
        }
      }
    });
    
    return find;
  }

  async findAllOrdersFinished({status}:OrdersStatus,companiesId:string ){
       const allOrdersFinished = await prismaClient.orders.findMany({
        where:{
            companiesId,
            status:status.finalizado
        },
       })
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
