import { Request, Response } from 'express';
import { deletarBebidaService } from '../services/delete.service';

export async function deletarBebida(req: Request, res: Response) {
  await deletarBebidaService(req, res);
}