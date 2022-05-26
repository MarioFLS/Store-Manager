const { expect } = require("chai");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const ModelStore = require('../../../models/ModelStore');


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
      const response = await ModelStore.getAllSales();

      expect(response).to.be.a("array");
    });
  });

  describe('Retorna a busca do Produto pelo ID', () => {

    beforeEach(() => {
      sinon.spy(connection, 'execute');
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Busca da venda pelo ID', async () => {
      const id = 1
      const getSalesById = await ModelStore.getSalesById(id);
      expect(getSalesById).to.be.a('array');
      expect(getSalesById[0]).to.have.all.keys('date', 'productId', 'quantity');
    });

    it('Erro caso o ID não exista', async () => {
      const id = 999;
      const getSalesById = await ModelStore.getSalesById(id);
      expect(getSalesById).to.be.false;
    });
  });
});