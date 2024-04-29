import { CriarBebidaRepository } from '../repositories/postBebida.repository';


export async function criarBebidaService({ nome, tipo, preco }: { nome: string; tipo: string; preco: number }) {
    return await CriarBebidaRepository({ nome, tipo, preco });
  }