import { Prisma } from "@prisma/client";
import { prismaClient } from "../../prisma/prismaClient";

class MenuService {
  async create({
    title,
    categoria,
    price,
    amount,
    weight,
    companiesId,
  }: Prisma.MenuOfCompaniesCreateManyInput) {
    const create = await prismaClient.menuOfCompanies.createMany({
      data: {
        title,
        price,
        amount,
        categoria,
        companiesId,
        weight,
      },
    });
    return create;
  }

  async findMany(companiesId: string) {
    const findmany = await prismaClient.menuOfCompanies.findMany({
      where: {
        companiesId,
      },
    });
    if (!findmany) {
      throw new Error("not find");
    }
    return findmany;
  }

  async findUnique(param:string) {
    const findunique = await prismaClient.menuOfCompanies.findFirst({
      where: {
        OR: [{ companiesId:param }, { title: { contains: param } }],
      },
    });
    return findunique;
  }

  async del(id: string) {
    await prismaClient.menuOfCompanies.delete({ where: { id } });

  }

  async update(id:string, {data:{categoria,price,title,amount,weight}}:Prisma.MenuOfCompaniesUpdateManyArgs){
      const update = await prismaClient.menuOfCompanies.update({
        where:{
            id
        },
        data:{
            title,
            categoria,
            price,
            amount,
            weight
        }
      })
      return update;
  }
}

export { MenuService };
