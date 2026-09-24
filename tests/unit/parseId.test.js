//tests / unit / parseId.test.js
const parseId = require("../../src/helpers/parseId");
const { ValidationError } = require("../../src/errors/AppError");
describe("parseId", () => {
    // Para testar ERRO, o expect recebe uma função: () => ...
    it("lança ValidationError quando o id não é número", () => {
        expect(() => parseId("abc")).toThrow(ValidationError);
    });

    it("deve lançar ValidationError quando o id contém mistura de números e letras ('12abc')", () => {
        expect(() => parseId("12abc")).toThrow(ValidationError);
    });
});



// DESAFIO: escrevam aqui um teste para a pergunta abaixo
//Um id "12abc" deveria ser aceito? Pensem no que deveria acontecer, escrevam o teste com essa expectativae rodem 