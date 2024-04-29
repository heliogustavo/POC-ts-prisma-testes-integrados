import { Request, Response } from 'express';
import { deletarBebidaRepository } from '../repositories/delete.repository';

export async function deletarBebidaService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deletarBebidaRepository(parseInt(id));
    res.json({ message: 'Bebida deletada com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}