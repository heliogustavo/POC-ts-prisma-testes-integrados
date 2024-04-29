import request from 'supertest';
import { app } from '../src/app';
import client from 'database/prisma';
import { criarBebida } from './bebidasFactory';

describe('Testes de integração de uma API de bebidas', () => {
  let createdBebidaId: number;

  it('Verificar se criou uma bebida', async () => {
    const bebidaData = { nome: 'FantaLaranja', tipo: 'Refrigerante', preco: 7.99 };
    const response = await request(app)
      .post('/add-bebida')
      .send(bebidaData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    createdBebidaId = response.body.id;
  });

  it('Teste para buscar uma bebida por ID', async () => {
    // Cria uma nova bebida exclusiva para este teste
    const novaBebida = await criarBebida({ nome: 'CocaCola', tipo: 'Refrigerante', preco: 5.99 });

    const response = await request(app).get(`/bebidas-by-id/${novaBebida.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', novaBebida.nome);
    expect(response.body).toHaveProperty('tipo', novaBebida.tipo);
    expect(response.body).toHaveProperty('preco', novaBebida.preco);
  });

  it('Tentar editar uma bebida existente', async () => {
    // Cria uma nova bebida exclusiva para este teste
    const novaBebida = await criarBebida({ nome: 'Pepsi', tipo: 'Refrigerante', preco: 4.99 });

    const response = await request(app)
      .put(`/update/${novaBebida.id}`)
      .send({ nome: 'Pepsi Light', tipo: 'Refrigerante', preco: 4.99 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', novaBebida.id);
    expect(response.body).toHaveProperty('nome', 'Pepsi Light');
    expect(response.body).toHaveProperty('preco', 4.99);
  });

  it('Deve deletar uma bebida existente', async () => {
    const novaBebida = await criarBebida({ nome: 'Sprite', tipo: 'Refrigerante', preco: 3.49 });

    const response = await request(app).delete(`/delete/${novaBebida.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Bebida deletada com sucesso');
  });

  it('Retornará um erro ao buscar uma bebida inexistente por ID', async () => {
    const bebidaInexistenteId = 999999;

    const response = await request(app).get(`/bebidas-by-id/${bebidaInexistenteId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Bebida não encontrada');
  });

  afterEach(async () => {
    await client.bebida.deleteMany();
  });

});