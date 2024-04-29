import { Request, Response } from 'express';
import { atualizarBebidaService } from '../services/editBebida.service';

export async function atualizarBebida(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, tipo, preco }: { nome?: string; tipo?: string; preco?: number } = req.body;
    const bebidaAtualizada = await atualizarBebidaService(id, { nome, tipo, preco });
    res.json(bebidaAtualizada);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}