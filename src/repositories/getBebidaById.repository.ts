import client from '../database/prisma';

export async function getBebidaByIdRepository(id: string) {
    return await client.bebida.findUnique({
      where: { id: parseInt(id) },
    });
  }