// src/helpers/parseId.js
const { ValidationError } = require("../errors/AppError");

function parseId(valor) {
  if (!valor || !/^\d+$/.test(valor)) {
    throw new ValidationError("ID deve ser um número válido");
  }

  const id = parseInt(valor, 10);

  return id;
}

module.exports = parseId;