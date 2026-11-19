# Registro de Testes de Endpoint

Aluno: Lívia Oliveira Martins Matos
Grupo: Grupo 8

## Testes escritos

| # | Verbo e rota | Com token? | Status esperado | Verde ou vermelho? |
| --- | ------------ | ---------- | --------------- | ------------------ |
| 1 | POST /eventos | Sim | 201 | Verde |
| 2 | GET /eventos/:id | Não | 404 | Verde |
| 3 | GET /eventos/:id | Não | 400 | Vermelho |

## Resultado

Linha "Tests:" da saída do npm run test:endpoint: Tests: <br>1 failed, 4 passed, 5 total

## Defeito encontrado

**Teste:** responde 400 quando o id tem letras (GET /eventos/:id passando ${evento.id}abc)<br>
**Esperado:** 400<br>
**Obtido:** 200<br>
**Em qual aula esse mesmo defeito já tinha aparecido, e como:** Na Aula 04 de testes unitários, na função parseId("12abc"), que devolvia o número 12 em vez de lançar erro porque o parseInt do JavaScript ignora as letras após os números.
