const sinon = require("sinon");
const { expect } = require("chai");
const ControllerStore = require('../../../controllers/ControllerFindItems');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceSales');


describe("Testando a Camada de Controller", () => {

  describe("Teste de Products, quando buscamos todos os produtos", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      const execute = [[{
        "saleId": 1,
        "date": "2022-05-26T16:07:58.000Z",
        "productId": 1,
        "quantity": 5
    },]];
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
      await ControllerStore.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe("Teste de busca do produto pelo ID", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      const execute = [[
        {
          "sale_id": 2,
          "date": "2022-05-26T18:40:06.000Z",
          "product_id": 3,
          "quantity": 15
        }
      ]];
      req.params = { id: 2 };
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
      await ControllerStore.getSalesById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
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
      sinon.stub(ServiceStore, 'getSalesById').resolves(erro);
    });
    afterEach(() => {
      connection.execute.restore();
      ServiceStore.getSalesById.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await ControllerStore.getSalesById(req, res, next);

      // Ele não pode vir 200
      expect(res.status.calledWith(200)).to.be.equal(false);
    });
  });

});
