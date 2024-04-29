import { Request, Response } from 'express';
import { criarBebidaService } from '../services/criarBebida.service';

export async function addBebida(req: Request, res: Response) {
  const { nome, tipo, preco }: { nome: string; tipo: string; preco: number } = req.body;

  try {
    const novaBebida = await criarBebidaService({ nome, tipo, preco });
    res.json(novaBebida);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}