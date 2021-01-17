# Lista de tarefas com Node + Express + Postgres + JWT

## Deploy e testes com Postman
- A aplicação está no ar no endereço: https://wagner-todolist.herokuapp.com/
- Caso você use o Postman para testar endpoints de API, importe o arquivo da raiz `todolist.postman_collection.json` para o seu app.
- Lembre-se de colocar o Token JWT no header ('x-access-token').

## Resiquitos:
 - NodeJs
 
 - Docker
 
 - Docker Compose

## Como testar:

- Use o arquivo `src/database/schema.sql` para gerar o banco Postgres.

- Duplique o arquivo .env.example e renomeie a cópia para .env, se for necessário, mude o conteúdo das variaveis ambiente de acordo com seu local.

- Rode o comando `yarn install` ou `npm install` para baixar a dependências

- Rode o comando `yarn dev` ou `npm start` na raiz do projeto para iniciá-lo

## Docker (em desenvolvimento)
Gera o build e sobe os containers. Mas não está funcionando a conexão do projeto com o banco criado.
- Rode o projeto: docker-compose up
