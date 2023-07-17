import { AES } from "crypto-js";
import { prismaClient } from "../../prisma/prismaClient";

type SinginCredencials = {
  email: string;
  password: string;
};

class SinginCompanyService {
  async singin({ email, password }: SinginCredencials) {
    const decryptedPassword = AES.decrypt(password, "").toString(CryptoJS.enc.Utf8);

    const isUser = await prismaClient.companies.findFirst({
      where: {
        email: email,
        password: decryptedPassword,
      },
    });
    if (!isUser) {
      throw new Error("this user not ecxist");
    }

    const registerSingin = await prismaClient.session.create({
      data: {
        email: email,
        name_company: isUser.name_company,
        companyId: isUser?.id,
        backgroundColor: isUser?.backgroundColor,
        imgProfile: isUser?.imgProfile,
      },
    });
    return registerSingin;
  }

  async singout(id: string) {
    await prismaClient.session.delete({
      where: {
        id: id,
      },
    });
  }

  async isLogin(id: string) {
    const response = await prismaClient.session.findFirst({
      where: {
        id: id,
      },
    });
    return response;
  }
}
export { SinginCompanyService };
