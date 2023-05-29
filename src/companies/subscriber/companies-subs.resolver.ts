import { Request, Response } from "express";
import { CompaniesSubsService, SubscriberCredencials } from "./companies-subs.service";

const service = new CompaniesSubsService();

class CompaniesSubsResolver {
  async subscriber(req: Request, res: Response) {
    const {
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
    }: SubscriberCredencials = req.body;

    const execute = await service.subscriber({
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
    });
    return execute;
  }
}

export { CompaniesSubsResolver };
