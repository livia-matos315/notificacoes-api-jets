# Registro de Testes Unitários

**Aluno:** Lívia Oliveira Martins Matos  
**Grupo:** 8  
**Data:** 24/09/2026  

## Testes escritos

| # | Arquivo | O que o teste verifica | Tipo |
| --- | ------- | ---------------------- | ----------------------- |
| 1 | `ambiente.test.js` | Verifica se o ambiente de testes está configurado executando a soma (`1 + 1`)[cite: 1] | Sucesso |
| 2 | `parseId.test.js` | Verifica se lança `ValidationError` quando o ID não é um número (`"abc"`)[cite: 2] | Sucesso |
| 3 | `parseId.test.js` | Verifica se lança `ValidationError` quando o ID mistura números e letras (`"12abc"`)[cite: 2] | Falha |
| 4 | `validators.test.js` | Verifica se lança `ValidationError` quando o ID não é um número (`"abc"`) | Sucesso |
| 5 | `validators.test.js` | Verifica se lança `ValidationError` quando o ID mistura números e letras (`"12abc"`)[cite: 3] | Falha |
| 6 | `validators.test.js` | Verifica se retorna o número correto (`12`) quando o ID é uma string numérica válida (`"12"`)[cite: 3] | Sucesso |

## Resultado

- **Passaram:** 5
- **Falharam:** 1 (Desafio)


## Defeito encontrado

- **Teste:** `lança ValidationError quando o id contém mistura de números e letras ('12abc')`
- **Esperado:** A função `parseId("12abc")` deve lançar uma exceção da classe `ValidationError`[cite: 2, 3].
- **Obtido:** A função não lançou erro e retornou o número `12` (`Received function did not throw`)
**Causa raiz:** O `parseInt("12abc")` converte apenas os primeiros dígitos (`12`) e ignora as letras (`"abc"`). Como o teste do Regex `/^\d+$/.test(id)` foi feito depois do `parseInt`, ele validou a variável `id` que já era o número `12` (convertido para string `"12"`), deixando a string inválida passar sem disparar o erro.

## Cobertura

- **% Lines da linha "helpers":** `22,22%`
- **Em uma frase, o que esse número significa:** Significa que apenas essa quantidad de linhas foi executada para teste.