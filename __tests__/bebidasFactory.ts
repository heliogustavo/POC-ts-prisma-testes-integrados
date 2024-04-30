import { Bebida, Prisma } from '@prisma/client';
import client from '../src/database/prisma';

export async function criarBebida(bebidaData: Prisma.BebidaCreateInput): Promise<Bebida> {
  const bebida = await client.bebida.create({
    data: bebidaData,
  });
  return bebida;
}
