import { Request, Response } from 'express';
import client from '../database/prisma';

export async function listaDeBebidasRepository (req: Request, res: Response) {
    return await client.bebida.findMany(); 
}