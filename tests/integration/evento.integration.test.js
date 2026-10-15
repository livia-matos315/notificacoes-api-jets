const { sequelize, Evento } = require("../../src/models");
const EventoService = require("../../src/services/EventoService");
const { ValidationError } = require("sequelize");
const limparBanco = require("../helpers/limparBanco");

beforeEach(async () => {
    await limparBanco();
});

afterAll(async () => {
    await sequelize.close();
});

describe("EventoService.criar (integração)", () => {

    it("não grava evento com nome de 2 letras", async () => {
        //Arrange
        const dados = { nome: "TI", data: "2026-10-15" };

        // Act + Assert: a gravação precisa ser recusada
        await expect(EventoService.criar(dados)).rejects.toThrow("Nome deve ter entre 3 e 255 caracteres");

        // Assert no banco: nada foi gravado
        const total = await Evento.count();
        expect(total).toBe(0);
    });

    it("grava o evento no banco com o nome correto", async () => {
        const dados = { nome: "Semana de Tecnologia", data: "2026-11-20" };

        const criado = await EventoService.criar(dados);

        const doBanco = await Evento.findByPk(criado.id);

        expect(doBanco).not.toBeNull();
        expect(doBanco.nome).toBe(dados.nome);
    });

});
