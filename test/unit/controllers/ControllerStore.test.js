const sinon = require("sinon");
const { expect } = require("chai");
const ControllerStore = require('../../../controllers/ControllerStore');
const connection = require('../../../database/connection');


describe("Testando a Camada de Controller", () => {

  describe("Teste de Products, quando buscamos todos os produtos", () => {
    const req = {};
    const res = {};
    beforeEach(() => {

      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();
    });

    it("Retorno do Status quando sucesso", async () => {
      await ControllerStore.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Teste de busca da venda pelo ID", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      req.params = { id: 1 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

        sinon.spy(connection, 'execute')
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando sucesso", async () => {
      await ControllerStore.getProductsById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it("Resposta do servidor quando tem sucesso", async () => {
      await ControllerStore.getProductsById(req, res);
      expect(res.json.calledWith(sinon.match({
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }))).to.be.equal(true);
    });
  });

  describe("Teste de Products, quando buscamos pelo ID", () => {
    const req = {};
    const res = {};
    const next = () => {};
    beforeEach(() => {
      req.params = { id: 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

        sinon.spy(connection, 'execute')
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await ControllerStore.getProductsById(req, res, next);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });

});
