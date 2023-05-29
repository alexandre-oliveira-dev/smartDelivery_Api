import { prismaClient } from "../../prisma/prismaClient";

export type SubscriberCredencials = {
  data: {
    address: string;
    cnpj: string;
    email: string;
    imgProfile: string;
    isSubiscriber: boolean;
    name_company: string;
    password: string;
    payments_methods: string;
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
}
export { CompaniesSubsService };
