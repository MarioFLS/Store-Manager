const { expect } = require("chai");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceStore');


describe("Testando Camada de Models - Sales", () => {

  describe("Chamada de todas as vendas", () => {
    beforeEach(() => {
      const execute = [[
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]];
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna um array com todos os itens", async () => {
      const response = await ServiceStore.getSalesById(1);

      expect(response).to.be.a("array");
    });
  });

  describe('Retorna a busca do Produto pelo ID', () => {
    beforeEach(() => {
      const execute = [[
        {
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        }
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Busca da venda pelo ID', async () => {
      const id = 1
      const getSalesById = await ServiceStore.getSalesById(id);
      expect(getSalesById).to.be.a('array');
      expect(getSalesById[0]).to.have.all.keys('date', 'productId', 'quantity');
    });
  });

  describe('Caso não exista produto com o ID correspondente', () => {
    beforeEach(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar uma mensagem de Erro', async () => {
      const getProductsById = await ServiceStore.getSalesById(90);
      expect(getProductsById).to.deep
      .equal({ error: { message: 'Sale not found', code: 404 } });
    })
  })
});