const sinon = require("sinon");
const { expect } = require("chai");
const ControllerStore = require('../../../controllers/ControllerFindItems');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceProduct');


describe("Testando a Camada de Controller", () => {

  describe("Teste de Sales, quando buscamos todos os produtos", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      const execute = [[{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }]];
      req.body = {};
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorno do Status quando sucesso", async () => {
      await ControllerStore.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Teste de busca do Venda pelo ID", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      const execute = [[{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }]];
      req.params = { id: 1 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando sucesso", async () => {
      await ControllerStore.getProductsById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("Objeto de retorno quando tem sucesso", async () => {
      await ControllerStore.getProductsById(req, res);
      expect(res.json.calledWith({
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      })).to.be.equal(true);
    });
  });

  describe("Teste de Sales, quando buscamos pelo ID", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const erro = { error: { message: 'Product not found', code: 404 } };
      req.params = { id: 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();
      sinon.stub(connection, 'execute').resolves([[]]);
      sinon.stub(ServiceStore, 'getProductsById').resolves(erro);
    });
    afterEach(() => {
      connection.execute.restore();
      ServiceStore.getProductsById.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await ControllerStore.getProductsById(req, res, next);

      // Ele não pode vir 200
      expect(res.status.calledWith(200)).to.be.equal(false);
    });
  });

});
