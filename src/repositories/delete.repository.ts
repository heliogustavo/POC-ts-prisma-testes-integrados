import client from '../database/prisma';

export async function deletarBebidaRepository(id: number) {
  await client.bebida.delete({
    where: { id },
  });
}