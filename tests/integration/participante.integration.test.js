const { sequelize, Participante } = require("../../src/models");
const ParticipanteService = require("../../src/services/ParticipanteService");
const limparBanco = require("../helpers/limparBanco");

beforeEach(async () => {
    await limparBanco();
});

afterAll(async () => {
    await sequelize.close();
});

describe("ParticipanteService.criar (integração)", () => {
    it("grava o participante no banco com nome e e-mail corretos", async () => {
        const dados = { nome: "Ana Souza", email: "ana@senai.br" };
        const criado = await ParticipanteService.criar(dados);
        const doBanco = await Participante.findByPk(criado.id);
        expect(doBanco).not.toBeNull();
        expect(doBanco.nome).toBe("Ana Souza");
    });

    it("não grava participante com e-mail inválido", async () => {
        const dados = { nome: "Bruno", email: "bruno.aluno.senai" };
        await expect(ParticipanteService.criar(dados)).rejects.toThrow();
        const total = await Participante.count();
        expect(total).toBe(0);
    });
    describe("ParticipanteService.atualizar (integração)", () => {
        it("grava o nome novo no banco", async () => {
            // Arrange: crie um participante "Ana", e-mail "ana@senai.br"
            const criado = await ParticipanteService.criar({ nome: "Ana", email: "ana@senai.br" });

            // Act: atualize o nome para "Ana Maria"
            await ParticipanteService.atualizar(criado.id, { nome: "Ana Maria" });

            const doBanco = await Participante.findByPk(criado.id);
            expect(doBanco.nome).toBe("Ana Maria");
        });
    });
});
