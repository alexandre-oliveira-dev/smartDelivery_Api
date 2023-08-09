import { Request, Response } from "express";
import { CompaniesSubsService, SubscriberCredencials } from "./companies-subs.service";

const service = new CompaniesSubsService();

class CompaniesSubsResolver {
  async subscriber(req: Request, res: Response) {
    const {
      data: { address, cnpj, email, name_company, password, payments_methods, phone,closingTime,daysOfWeeks,openingTime },
    }: SubscriberCredencials = req.body;

    const execute = await service.subscriber({
      data: {
        address,
        cnpj,
        email,
        name_company,
        password,
        payments_methods,
        phone,
        closingTime,
        daysOfWeeks,
        openingTime
      },
    });
    return res.json(execute).status(200);
  }

  async updateCompanie(req: Request, res: Response) {
    const {
      address,
      cnpj,
      email,
      name_company,
      password,
      payments_methods,
      phone,
      isSubiscriber,
      backgroundColor,
      imgProfile,
      closingTime,
      daysOfWeeks,
      openingTime,
    } = req.body;
    const { id } = req.params;

    const execute = await service.updateCompany(id, String(req.headers.authorization), {
      data: {
        address,
        cnpj,
        email,
        name_company,
        password,
        payments_methods,
        phone,
        isSubiscriber,
        backgroundColor,
        imgProfile,
        closingTime,
        daysOfWeeks,
        openingTime,
      },
    });
    if (!execute) {
      return res.end().status(500);
    }
    return res.json().status(200);
  }

  async getAll(req: Request, res: Response) {
    const execute = await service.getAll();
    return res.json(execute);
  }
  async getByName(req: Request, res: Response) {
    const { name_company } = req.query;
    const execute = await service.getByNameCompany(String(name_company));
    return res.json(execute);
  }
  async getAllForArgs(req: Request, res: Response) {
    const { args } = req.params;
    const execute = await service.getForArgs(args);
    return res.json(execute);
  }
  async removeCompanie(req: Request, res: Response) {
    const { id } = req.params;
    await service.removeCompanie(id);
    return res.json({ message: "companie successfully removed" }).status(200);
  }
}

export { CompaniesSubsResolver };
