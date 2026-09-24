// tests/unit/parseId.test.js
const parseId = require("../../src/helpers/parseId");
const { ValidationError } = require("../../src/errors/AppError");

describe("parseId", () => {
  it("lança ValidationError quando o id não é número", () => {
    expect(() => parseId("abc")).toThrow(ValidationError);
  });

  it("lança ValidationError quando o id contém mistura de números e letras ('12abc')", () => {
    expect(() => parseId("12abc")).toThrow(ValidationError);
  });

  it("retorna o número correto quando o id é uma string numérica válida", () => {
    expect(parseId("12")).toBe(12);
  });
});