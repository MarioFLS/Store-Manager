const { expect } = require("chai");
const res = require("express/lib/response");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const findItem = require('../../../models/FindInTheDatabase');

describe("Testando Camada de Models - Find In The Database", () => {

  describe("Procurando um produto pelo Nome", () => {
    beforeEach(() => {
      const execute = [
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10
        },
      ];

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Procurando Produto:Martelo de Thor  ", async () => {
      const response = await findItem.findProductName('Martelo de Thor');

      expect(response).to.be.a("object");
      expect(response).to.deep.equal({
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10
      })
    });
  });

  describe('Procurando um produto pelo ID', () => {
    beforeEach(() => {
      const execute = [
        {
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20
        },
      ];

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Procurando Produto de ID: 2 ", async () => {
      const response = await findItem.findProductId(2);

      expect(response).to.be.a("object");
      expect(response).to.deep.equal({
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20
      })
    });
  });

  describe('Edita uma venda no Banco de Dados', () => {
    beforeEach(() => {
      const execute = [
        {
          id: 3,
          date: '2022-06-01 00:35:18',
        },
      ];

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Procurando Produto de ID: 2 ", async () => {
      const response = await findItem.findSalesId(3);

      expect(response).to.be.a("object");
      expect(response).to.deep.equal({
        id: 3,
        date: '2022-06-01 00:35:18',
      })
    });
  });
});