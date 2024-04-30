import request from 'supertest';
import { app } from '../src/app';
import client from '../src/database/prisma';
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
    const bebidaData = await criarBebida({ nome: 'FantaLaranja', tipo: 'Refrigerante', preco: 7.99 });
    const response = await request(app).get(`/bebidas-by-id/${bebidaData.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'FantaLaranja');
    expect(response.body).toHaveProperty('tipo', 'Refrigerante');
    expect(response.body).toHaveProperty('preco', 7.99);
  });

  it('Tentar editar uma bebida existente', async () => {
    const bebidaData = await criarBebida({ nome: 'FantaLaranja', tipo: 'Refrigerante', preco: 7.99 });
    const response = await request(app)
      .put(`/update/${bebidaData.id}`)
      .send({ nome: 'Pepsi', tipo: 'Refrigerante', preco: 4.99 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', bebidaData.id);
    expect(response.body).toHaveProperty('nome', 'Pepsi');
    expect(response.body).toHaveProperty('preco', 4.99);
  });

  it('Deve deletar uma bebida existente', async () => {
    const bebidaData = await criarBebida({ nome: 'FantaLaranja', tipo: 'Refrigerante', preco: 7.99 });
    const response = await request(app).delete(`/delete/${bebidaData.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Bebida deletada com sucesso');
  });

  it('Retornará um erro ao buscar uma bebida inexistente por ID', async () => {
    const response = await request(app).get(`/bebidas-by-id/9999`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Bebida não encontrada');
  });

  afterEach(async () => {
    await client.bebida.deleteMany();
  });
});
