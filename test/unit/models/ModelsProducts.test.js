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

      sinon.spy(connection, 'execute')
      
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Query é a correta', async () => {
      const id = 2
      await ModelStore.getProductsById(id);
      const query = connection.execute.getCall(0);
      expect(query.args).to.deep.equal([ 'SELECT * FROM StoreManager.products WHERE id = ?;', [ 2 ] ]);
    });

    it('Produto buscado pelo ID', async() => {
      const id = 2
      connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
      const getProductsById = await ModelStore.getProductsById(id);
      expect(getProductsById).to.be.a('array');
      expect(getProductsById).to.deep.equal([ { id: 2, name: 'Traje de encolhimento', quantity: 20 } ]);
    });

    it('Caso o id do Produto não exista', async() => {
      const id = 999;
      connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
      const getProductsById = await ModelStore.getProductsById(id);
      expect(getProductsById).to.be.false;
    });
  }); 
});