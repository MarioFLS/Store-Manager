const { expect } = require("chai");
const sinon = require('sinon');
const connection = require('../../../database/connection');
const ModelStore = require('../../../models/ModelStore');


describe("Testando Camada de Models - Products", () => {

  describe("Chamada de todos os Produtos", () => {
    beforeEach(() => {
      const execute = [[
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "Escudo do Cap",
          "quantity": 30
        },
      ]];

      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna array com todos os itens", async () => {
      const response = await ModelStore.getAllProducts();

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
        },
      ]];

      sinon.stub(connection, 'execute').resolves(execute);
      
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Query é a correta', async () => {
      await ModelStore.getProductsById(2);
      const query = connection.execute.getCall(0);
      expect(query.args).to.deep.equal([ 'SELECT * FROM StoreManager.products WHERE id = ?;', [ 2 ] ]);
    });

  it('Produto buscado pelo ID', async() => {
      const getProductsById = await ModelStore.getProductsById(2);
      expect(getProductsById).to.be.a('array');
      expect(getProductsById).to.deep.equal([ { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]);
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

    it('O Retorno deve ser um "false"', async () => {
      const getProductsById = await ModelStore.getProductsById(90);
      expect(getProductsById).to.false;
    })
  })
});