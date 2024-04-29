import { Request, Response } from 'express';
import client from '../database/prisma';

export async function CriarBebidaRepository({ nome, tipo, preco }: { nome: string; tipo: string; preco: number }) {
  const criarBebida = await client.bebida.create({
    data: {
      nome,
      tipo,
      preco,
    },
  });
  return criarBebida;
}