#  Ts-Nest-Api

API para gerenciamento de usuários implementada em Node.js com Typescript usando o framework NestJS.

### Links da API

* [Documentação (Insomnia)](https://joao-rangel.github.io/ts-nest-api)

* [Ts-Nest-API (Heroku)](https://ts-nest-api.herokuapp.com)

###  Observações/Considerações

* O banco de dados utilizado foi o MySQL uma vez que deseja-se utilizar a opção *unsigned* para as chaves primárias;
* Utilizou-se TypeORM para a comunicação com o banco de dados, por sua compatibilidade com Typescript e também com NestJS;
* A tipagem de objetos (como DTO), foi implementada por meio de classes como recomentado pela documentação do NestJS.
* A documentação foi gerada através do Insomnia, client usado para testar a api durante do desenvolvimento.
* Tomei a liberdade de alterar  o tipo da coluna *created* (na tabela *users*) para *TIMESTAMP* para fazer deploy no Heroku com o ClearDB.

### Dependências do sistema

* [Node.JS](https://nodejs.org/en/) - 14.15.x
* [MySQL](https://dev.mysql.com/doc/) - 8.0.x
* [Docker](https://docs.docker.com/get-docker/) 19.03.x


### Configurações

1.  Clone o projeto e acesse a pasta:
```
    $ git clone https://github.com/joao-rangel/ts-nest-api.git && cd ts-gobarber-backend
```
2.  Rode o yarn para instalar as bibliotecas:
```
    $ yarn
```
3.  Copie o conteúdo das variáveis de ambiente e altere seus valores:
```
    $ cp .env.example .env
```
4.  Inicie os bancos de dados com o docker (alterando os valores conforme .env):
  * Criando e iniciando o container
```
     $ docker run --name mysql -d -p 3306:3306 -e MYSQL_DATABASE=api -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_USER=nest -e MYSQL_PASSWORD=docker mysql
```
  * Caso já tenha o container criado
```
     $ docker start mysql
```
5.  Execute as migrations do banco de dados:
```
    $ yarn typeorm migration:run
```
6.  Inicie o projeto:
```
    $ yarn start:dev
```
7. (Opcional) Rode os testes:
```
    $ yarn test:cov
```

### Sugestões para funcionalidades futuras:
* Embora o email não seja um ítem obrigatório, uma sugestão seria verificar se o email já foi cadastrado, para evitar usuários duplicados.
* A documentação apresentada foi implementada com o Insomnia, uma alternativa seria sua implementação com o Swagger.