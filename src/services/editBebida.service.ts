import { Bebida } from "@prisma/client";
import { atualizarBebidaRepository } from "../repositories/editBebida.repository";

export async function atualizarBebidaService(id: string, data: Partial<Bebida>) {
    return await atualizarBebidaRepository(id, data);
  }