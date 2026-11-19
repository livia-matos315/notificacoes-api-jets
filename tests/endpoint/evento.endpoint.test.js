// tests/endpoint/evento.endpoint.test.js
const request = require("supertest");
const app = require("../../src/app");
const { sequelize, Evento } = require("../../src/models");
const limparBanco = require("../helpers/limparBanco");
const obterToken = require("../helpers/obterToken");

beforeEach(async () => {
  await limparBanco();
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /eventos (rota pública)", () => {
  it("responde 200 com a lista de eventos vazia", async () => {
    const resposta = await request(app).get("/eventos");

    expect(resposta.status).toBe(200);
    expect(resposta.body.dados).toEqual([]);
    expect(resposta.body.total).toBe(0);
  });
});

describe("POST /eventos (rota protegida)", () => {
  it("responde 401 quando não manda o token", async () => {
    const evento = { nome: "Semana de Tecnologia", data: "2026-11-20" };

    const resposta = await request(app).post("/eventos").send(evento);

    expect(resposta.status).toBe(401);
    expect(resposta.body.erro.mensagem).toBe("Token não fornecido");
  });

  it("responde 201 quando manda um token válido", async () => {
    const token = await obterToken();
    const evento = { nome: "Semana de Tecnologia", data: "2026-11-20" };

    const resposta = await request(app)
      .post("/eventos")
      .set("Authorization", `Bearer ${token}`)
      .send(evento);

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome).toBe("Semana de Tecnologia");
  });
});

describe("GET /eventos/:id (rota pública)", () => {
  it("responde 404 quando o evento não existe", async () => {
    // Act: peçam um id que não existe no banco de teste
    const resposta = await request(app).get("/eventos/999");
    // Assert
    expect(resposta.status).toBe(404);
    expect(resposta.body.erro.mensagem).toBe("Evento não encontrado(a)");

  });
  it("responde 400 quando o id tem letras", async () => {
    const evento = await Evento.create({
      nome: "Semana de Tecnologia",
      data: "2026-11-20",
    });

    const resposta = await request(app).get(`/eventos/${evento.id}abc`);

    expect(resposta.status).toBe(400);
  });

});
