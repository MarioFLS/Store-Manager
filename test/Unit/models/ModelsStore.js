const sinon = require("sinon");
const { expect } = require("chai");
const connection = require('../../../database/connection');
const ModelStore = require('../../../models/ModelStore');


describe("Testando Camada de Models", () => {

  describe("Chamada de todos os itens", () => {
    before(() => {
      const execute = [
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
      ];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
    it("retorna um objeto", async () => {
      //CHAMEI O CREATE, ELE FAZ O CONNECTION EXECUTE E RETORNA O VALOR INSERIDO IGUAL A 1
      const [response] = await ModelStore.getAllProducts();

      expect(response).to.be.a("object");
    });
  });

  describe('Busca do Item pelo ID', () => {
    before(() => {
      const execute = [
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
      ];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
    it('Saida dos Produtos', async () => {
      const [response] = await ModelStore.getProductsById();
      expect(response).to.be.a("object");
    });
  });
});
