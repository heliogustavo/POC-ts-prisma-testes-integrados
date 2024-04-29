import { Request, Response } from 'express';
import { listaDeBebidasRepository } from '../repositories/getListBebidas.reposirory';


export async function criarListaDeBebidas (req: Request, res: Response) {
    return await listaDeBebidasRepository(req, res); 
}