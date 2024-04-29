import { Request, Response } from 'express';
import { Bebida } from '@prisma/client/index.js'
import { criarListaDeBebidas } from '../services/listaBebidas.service';

export async function listaDeBebidas (req: Request, res: Response) {
    try {
      const bebidas: Bebida[] = await criarListaDeBebidas(req, res); 
      res.json(bebidas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar bebidas' });
    }
};
