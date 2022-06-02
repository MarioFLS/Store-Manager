const { expect } = require("chai");
const res = require("express/lib/response");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const CreateProduct = require('../../../models/ModelCreateProduct');

describe("Testando Camada de Models - Create Products", () => {

  describe("Cria um novo Produto", () => {
    beforeEach(() => {
      const execute =  {"name": "produto", "quantity": 100 };

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna array com todos os itens", async () => {
      const response = await CreateProduct.createProduct();

      expect(response).to.be.a("object");
    });
  });

  describe('Edita um produto no Banco de Dados', () => {
    beforeEach(() => {
      const execute =  {"name": "produto", "quantity": 100 };

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno da edição do banco de dados', async () => {
      const response = await CreateProduct.editProduct();
      expect(response).to.be.a('object');
    });
  }); 

  describe('Deletar um Protudo', () => {
    beforeEach(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno do Delete', async () => {
      const response = await CreateProduct.deleteProduct(1);
      expect(response).to.deep.equals([[]]);
    })
  })
});