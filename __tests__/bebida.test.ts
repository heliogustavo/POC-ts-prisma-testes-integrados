import request from 'supertest';
import { app } from '../src/app';
import client from '../src/database/prisma';

describe('Testes de integração de uma API de bebidas', () => {
  let createdBebidaId: number;

  const createBebida = async (nome: string, tipo: string, preco: number) => {
    const response = await request(app)
      .post('/add-bebida')
      .send({ nome, tipo, preco });
    return response.body.id;
  };

  beforeEach(async () => {
    createdBebidaId = await createBebida('Bebida Teste', 'Teste', 9.99);
  });

  it('Verificar se criou uma bebida', async () => {
    expect(createdBebidaId).toBeDefined();
  });

  it('Teste para buscar uma bebida por ID', async () => {
    const response = await request(app).get(`/bebidas-by-id/${createdBebidaId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Bebida Teste');
    expect(response.body).toHaveProperty('tipo', 'Teste');
    expect(response.body).toHaveProperty('preco', 9.99);
  });

  it('Tentar editar uma bebida existente', async () => {
    const response = await request(app)
      .put(`/update/${createdBebidaId}`)
      .send({ nome: 'Pepsi', tipo: 'Refrigerante', preco: 4.99 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdBebidaId);
    expect(response.body).toHaveProperty('nome', 'Pepsi');
    expect(response.body).toHaveProperty('preco', 4.99);
  });

  it('Deve deletar uma bebida existente', async () => {
    const response = await request(app).delete(`/delete/${createdBebidaId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Bebida deletada com sucesso');
  });

  it('Retornará um erro ao buscar uma bebida inexistente por ID', async () => {
    const nonExistentId = 9999; // Um ID que não existe no banco de dados

    const response = await request(app).get(`/bebidas-by-id/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Bebida não encontrada');
  });

  afterEach(async () => {
    await client.bebida.deleteMany();
  });
});

console.log('finished');
