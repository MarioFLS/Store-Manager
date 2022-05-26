const sinon = require("sinon");
const { expect } = require("chai");
const connection = require('../../../database/connection');
const ControllersStore = require('../../../controllers/ControllerStore');


describe("Testando a Camada de Controller", () => {

  describe("Teste das Saidas e suas respostas", () => {
    const response = {};
    const request = {};
    const result = [
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
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(result);
      sinon.stub(ControllersStore, "getAllProducts").resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });
    it("retorna um objeto", async () => {
      await ControllersStore.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(result);
    });
  });

});
