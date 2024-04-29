import { Bebida } from '@prisma/client';
import client from '../database/prisma';

export async function atualizarBebidaRepository(id: string, data: Partial<Bebida>) {
  return await client.bebida.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
    },
  });
}