import { Prisma } from "@prisma/client";
import { prismaClient } from "../../prisma/prismaClient";

export type SubscriberCredencials = {
  data: {
    address: string;
    cnpj: string;
    email: string;
    imgProfile?: string;
    isSubiscriber?: boolean;
    name_company: string;
    password: string;
    payments_methods?: string;
    phone: string;
  };
};

class CompaniesSubsService {
  async subscriber({
    data: {
      address,
      cnpj,
      email,
      imgProfile,
      isSubiscriber,
      name_company,
      password,
      payments_methods,
      phone,
    },
  }: SubscriberCredencials) {
    const findCompanie = await prismaClient.companies.findFirst({
      where: {
        cnpj: cnpj,
      },
    });

    if (findCompanie) {
      throw new Error("company already exists");
    }
    const execute = await prismaClient.companies.create({
      data: {
        cnpj,
        email,
        address,
        name_company,
        phone,
        password,
        imgProfile,
        isSubiscriber,
        payments_methods,
      },
    });
    return execute;
  }

  async updateCompany(
    id: string,
    {
      data: {
        address,
        cnpj,
        email,
        imgProfile,
        isSubiscriber,
        name_company,
        password,
        payments_methods,
        phone,
        backgroundColor
      },
    }: Prisma.CompaniesUpdateManyArgs,
    
  ) {
    const updatecompany = await prismaClient.companies.update({
      where: {
        id: id,
      },
      data: {
        address,
        cnpj,
        email,
        imgProfile,
        backgroundColor,
        isSubiscriber,
        name_company,
        password,
        payments_methods,
        phone,
      },
    });
    return updatecompany;
  }

  async getAll() {
    const getall = await prismaClient.companies.findMany();
    return getall;
  }
  async getForArgs(args: string) {
    const getall = await prismaClient.companies.findUnique({
      where: {
        id: args,
      },
    });

    return getall;
  }

  async removeCompanie(id: string) {
    const remove = await prismaClient.companies.delete({
      where: { id: id },
    });
    return remove;
  }
}
export { CompaniesSubsService };
