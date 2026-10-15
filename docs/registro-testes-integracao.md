# Registro de Testes de Integração

Aluno: Lívia Oliveira Martins Matos
Grupo: 8
Data: 15/10/2026

## Banco de teste
Nome do banco de teste: notificacoes_test
Por que ele é separado do banco da API:
Evita que a limpeza de dados nos testes apague as informações do banco da API.

## Testes escritos
| # | Arquivo | O que o teste verifica | Verde ou vermelho? |
|---|---|---|---|
| 1 | evento.integration.test.js | Gravação do evento no banco com o nome correto | Verde |
| 2 | participante.integration.test.js | Recusa de cadastro de participante com e-mail inválido | Verde |
| 3 | participante.integration.test.js | Gravação do nome atualizado no banco via ParticipanteService.atualizar | Vermelho |

## Resultado
Linha "Tests:" da saída do npm run test:integration:
Tests: 1 failed, 4 passed, 5 total

## Defeito encontrado
Teste: ParticipanteService.atualizar (integração) - grava o nome novo no banco
Esperado: "Ana Maria"
Obtido: "Ana"
O que o usuário da API veria:
A rota responde com sucesso (200 OK), mas a alteração não é gravada no banco de dados fazendo com que o participante fique com o nome antigo.

### Erro:
```bash 
  tests/integration/participante.integration.test.js
  ● ParticipanteService.criar (integração) › ParticipanteService.atualizar (integração) › grava o nome novo no banco

    expect(received).toBe(expected) // Object.is equality

    Expected: "Ana Maria"
    Received: "Ana"
    ```