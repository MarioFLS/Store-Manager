const { expect } = require("chai");
const res = require("express/lib/response");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const CreateSales = require('../../../models/ModelCreateSales');

describe("Testando Camada de Models - Create Sales", () => {

  describe("Cria uma nova venda", () => {
    beforeEach(() => {
      const execute = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna um array da função ", async () => {
      const response = await CreateSales.createSales();

      expect(response).to.be.a("array");
    });
  });

  describe('Edita uma tabela intermediaria de venda e produtos no Banco de Dados', () => {
    const execute = [{
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 5
    }];
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno da edição do banco de dados', async () => {
      const response = await CreateSales.createSalesProducts(1, execute);
      expect(response).to.be.a('array');
      console.log(response)
      expect(response).to.deep.equals([
        [ { productId: 1, quantity: 2 }, { productId: 2, quantity: 5 } ],
        [ { productId: 1, quantity: 2 }, { productId: 2, quantity: 5 } ]
      ])
    });
  });

  describe('Edita uma venda no Banco de Dados', () => {
    const execute = [{
      "productId": 1,
      "quantity": 6
    }];
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno da edição do banco de dados', async () => {
      const response = await CreateSales.editSalesProducts(1, execute);
      expect(response).to.be.a('array');
    });
  });

  describe('Deletar uma Venda', () => {
    beforeEach(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno do Delete', async () => {
      const response = await CreateSales.deleteSales(1);
      expect(response).to.deep.equals([[]]);
    })
  })
});