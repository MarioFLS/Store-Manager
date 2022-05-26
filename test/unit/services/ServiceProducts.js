const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceStore');

describe("Testando Camada de Service - Products", () => {
  const response = {};
  const request = {};

  describe("Buscando Produto pela ID", () => {
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

    it("Retorna array com todos os itens", async () => {
      const response = await ServiceStore.getProductsById(1);

      expect(response).to.be.a("array");
    });
  });

  describe('Retorna a busca do Produto pelo ID', () => {
    beforeEach(() => {
      const execute = [[
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }
      ]];
      sinon.stub(connection, 'execute').resolves(execute)

    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Query é a correta', async () => {
      const id = 2
      await ServiceStore.getProductsById(id);
      const query = connection.execute.getCall(0);
      expect(query.args).to.deep.equal(['SELECT * FROM StoreManager.products WHERE id = ?;', [2]]);
    });

    it('Produto buscado pelo ID', async () => {
      const id = 2
      const getProductsById = await ServiceStore.getProductsById(id);
      expect(getProductsById).to.be.a('array');
      expect(getProductsById).to.deep.equal([{ id: 2, name: 'Traje de encolhimento', quantity: 20 }]);
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

    it('O retorno deve ser uma mensagem', async () => {
      const getProductsById = await ServiceStore.getProductsById(90);
      expect(getProductsById).to.deep
        .equal({ error: { message: 'Product not found', code: 404 } });
    })
  })
});