import { Request, Response } from "express";
import { SinginCompanyService } from "./company-login.service";

const service = new SinginCompanyService();

class SinginCompanyResolver {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const singin = await service.singin({ email, password });
    return res.json(singin);
  }

  async logout(req: Request, res: Response) {
    const { id } = req.params;
    await service.singout(id);

    return res.json({ message: "logout success" });
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const isuser = await service.isLogin(id);

    return res.json(isuser)
  }
}

export { SinginCompanyResolver };
