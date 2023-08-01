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
    description,
  }: Prisma.MenuOfCompaniesCreateManyInput) {
    const create = await prismaClient.menuOfCompanies.createMany({
      data: {
        title,
        price,
        amount,
        categoria,
        companiesId,
        weight,
        description,
      },
    });
    return create;
  }

  async findMany(companiesId: string, param: string | any, take: number, skip: number) {
    const findmany = await prismaClient.menuOfCompanies.findMany({
      where: {
        companiesId,
        OR: [{ categoria: { contains: param } }, { title: { contains: param } }],
      },
      take,
      skip,
      orderBy: { id: "desc" },
    });
    if (!findmany) {
      throw new Error("not find");
    }
    return findmany;
  }

  async del(id: string) {
    await prismaClient.menuOfCompanies.delete({ where: { id } });
  }

  async update(
    id: string,
    {
      data: { categoria, price, title, amount, weight, description },
    }: Prisma.MenuOfCompaniesUpdateManyArgs
  ) {
    const update = await prismaClient.menuOfCompanies.update({
      where: {
        id,
      },
      data: {
        title,
        categoria,
        price,
        amount,
        weight,
        description,
      },
    });
    return update;
  }
}

export { MenuService };
