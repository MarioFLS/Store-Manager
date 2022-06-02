# Projeto Store Manager!

Um Projeto feito no Curso da [Trybe!](https://www.betrybe.com/?utm_source=google&utm_medium=cpc&utm_campaign=pmax2&utm_content=ad1&gclid=CjwKCAjwv-GUBhAzEiwASUMm4gMsCoYbJWRZ4clNLOZqEP2NE69bHKEUuKKfcouMLG1L4MSPbR71CRoCHiYQAvD_BwE)

## Descrição
Store Manager é uma aplicação BackEnd em NodeJS que permiti você interagir diretamente com o banco de dados. Dando a sensação de ser um gerante de Loja. E ter controle sobre a criação e venda de Produtos.
 
Essa Aplicação Permite:

-  Ter uma experiência de estar criado produtos para sua loja e gerenciar as lojas;
-  Adição e exclusão de qualquer produto ou venda;

## Tecnologias Usadas

> Desenvolvida utilizando: JavaScript, NodeJS, expres, express-async-errors, Docker, e MySQL.
> Testado com: Mocha, Chai e sinon

# Como Utilizar

## Você pode escolher utilizar Docker ou Não.

<details>
  <summary><strong>🐳 Usando Docker</strong></summary><br />
 
  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
  - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it store_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  <br />
</details>

<details>
  <summary><strong>😀 Sem Docker</strong></summary><br />
 
  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.
  <br />
</details>

# Como Conectar ao Banco

<details>
  <summary><strong>🎲 Conexão com o Banco</strong></summary><br />

## Crie o Banco

>Utilize o Arquivo que está no repositório chamado: **StoreManager.sql** no seu MySQL. E poderá utilizar o banco de dados.


:warning: **IMPORTANTE!**
**A senha do Banco é Password**

```javascript
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

  const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});
```

Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
MYSQL_DATABASE=StoreManager
PORT=3000
```

##### :warning: Atenção

- **Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**

- A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente tanto na máquina local quanto no avaliador.

Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
Como o arquivo `.env` não será enviado para o GitHub (não se preocupe com isso, pois já está configurado no `.gitignore`), o avaliador utilizará as suas próprias variáveis de ambiente.

  <br />
</details>

## Como Testar Os Caminhos - Exemplos

> Alguns precisaram de informações adicionais no body da requisição.

<details>
  <summary><strong>Produtos</strong></summary><br />
  
  > Pegar todos os Produtos **GET**
``[http://localhost:3000/products](http://localhost:3000/products)``

> Pegar produto pelo ID **GET**. Precisa ser um ID que exista. Se não retornará um erro!
``[http://localhost:3000/products/2](http://localhost:3000/products/2)``

> Criar novos Produtos **POST**
``[http://localhost:3000/products/](http://localhost:3000/products/)``

```
{
    "name": "Produto 1",
    "quantity": 20
}
```

> Editar um Produto **PUT**. Você precisa passar um id existente!
``[http://localhost:3000/products/4](http://localhost:3000/products/4)``

```
{
    "name": "Produto 1 Novo",
    "quantity": 15
}
```

> Deletar um Produto **Delete**. Você precisa passar um id existente!
``[http://localhost:3000/products/4](http://localhost:3000/products/4)``
 
  <br />
</details>


<details>
  <summary><strong>Vendas</strong></summary><br />
  > Pegar todos as Vendas **GET**
``[http://localhost:3000/saless](http://localhost:3000/sales)``

> Pegar as vendas pelo ID **GET**. Precisa ser um ID que exista. Se não retornará um erro!
``[http://localhost:3000/sales/2](http://localhost:3000/sales/2)``

> Criar novas Vendas **POST**
``[http://localhost:3000/sales/](http://localhost:3000/sales/)``

```
[
    {
        "productId": 1,
        "quantity": 10
    },
    {
        "productId": 2,
        "quantity": 10
    }
]
```


> Editar uma venda **PUT**. Você precisa passar um id existente!
``[http://localhost:3000/sales/4](http://localhost:3000/sales/4)``

```
[
    {
        "productId": 1,
        "quantity": 2
    },
    {
        "productId": 3,
        "quantity": 12
    }
]
```

> Deletar uma venda **Delete**. Você precisa passar um id existente!
``[http://localhost:3000/sales/3](http://localhost:3000/sales/3)``
 
  <br />
</details>

## Iniciar a aplicação

> Você pode usar esse comando no terminal para iniciar a aplicação. O Console do terminal dirá em qual porta ele está usando. 

> Caso Possua algum erro e a aplicação não inicie: "A porta pode estar sendo utilizada. Teste o comando ``killall node``. 
> Mas cuidado, ele ira derrubar qualquer aplicação node".

> Veja também se o docker não foi fechado corretamente e esta usando a porta. Você pode simplismente reiniciar o container

``npm start``

## Testes

> Os testes podem acabar fazendo algumas mudanças no DB. Tenha cuidado.

``npm test``

