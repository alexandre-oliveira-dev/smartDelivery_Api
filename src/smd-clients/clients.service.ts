import { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma/prismaClient";

class ClientsService {
  async create({ email, name, phone }: Prisma.ClientsCreateManyInput) {
    const alreadyExists = await prismaClient.clients.findFirst({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      return  new Error('This user alreadyExists')
    }
    const execute = await prismaClient.clients.create({
      data: {
        email,
        name,
        phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });
    return execute;
  }
}
export { ClientsService };
