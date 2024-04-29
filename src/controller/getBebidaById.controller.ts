import { Request, Response } from 'express';
import client from '../database/prisma';
import { Bebida } from '@prisma/client/index.js'
import { getBebidaByIdService } from '../services/getBebidaById.service';


export async function getBebidaById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const bebida: Bebida | null = await getBebidaByIdService(id);
    
    if (!bebida) {
      res.status(404).json({ error: 'Bebida não encontrada' });
    } else {
      res.json(bebida);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}