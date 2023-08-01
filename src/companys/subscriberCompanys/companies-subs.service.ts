require("dotenv/config");
import { Prisma } from "@prisma/client";
import { prismaClient } from "../../prisma/prismaClient";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";

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
        cnpj,
        email
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
    authorization: string,
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
        backgroundColor,
      },
    }: Prisma.CompaniesUpdateManyArgs
  ) {
    const currentPassword = await prismaClient.companies.findUnique({
      where: { id },
    });

    const decryptedBytes = AES.decrypt(authorization, "");
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

    const UPDATE_AUTHORIZATION = process.env.UPDATE_AUTHORIZATION;
    
    if (decryptedString === String(currentPassword?.password)) {
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
    } else if (UPDATE_AUTHORIZATION === authorization) {
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
    } else {
      throw new Error("password invalid");
    }

  }

  async getAll() {
    const getall = await prismaClient.companies.findMany();
    return getall;
  }
  async getByNameCompany(name_company: string) {
    const getByname = await prismaClient.companies.findFirst({
      where: {
        name_company: { equals: name_company },
      },
      select: {
        address: true,
        backgroundColor: true,
        cnpj: true,
        email: true,
        id: true,
        imgProfile: true,
        Menu: true,
        name_company: true,
        payments_methods: true,
        phone: true,
        isSubiscriber: true,
      },
    });
    return getByname;
  }
  async getForArgs(args: string) {
    const getall = await prismaClient.companies.findUnique({
      where: {
        id: args,
      },
      select: {
        address: true,
        email: true,
        id: true,
        isSubiscriber: true,
        name_company: true,
        phone: true,
        cnpj: true,
        payments_methods: true,
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
