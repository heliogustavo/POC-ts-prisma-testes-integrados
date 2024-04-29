import { getBebidaByIdRepository } from '../repositories/getBebidaById.repository';


export async function getBebidaByIdService(id: string) {
    return await getBebidaByIdRepository(id); 
  }