const sinon = require("sinon");
const { expect } = require("chai");
const CreateProduct = require('../../../controllers/ControllerCreateProduct');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceProduct');


describe("Testando a Camada de Controller", () => {

  describe("Teste dos Produtos, quando buscamos todos os produtos", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[]];
      req.body = { "name": "Martelo dTho", "quantity": 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();
      sinon.stub(ServiceStore, 'createProduct').resolves(execute);
    });

    afterEach(() => {
      ServiceStore.createProduct.restore();
    });
    it("Retorno do Status quando sucesso", async () => {
      await CreateProduct.createProduct(req, res, next);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

 /*  describe("Teste de busca do Venda pelo ID", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
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
      await CreateProduct.getProductsById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("Objeto de retorno quando tem sucesso", async () => {
      await CreateProduct.getProductsById(req, res);
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
      sinon.stub(ServiceStore, 'getProductsById').resolves(erro);
    });
    afterEach(() => {
      ServiceStore.getProductsById.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await CreateProduct.getProductsById(req, res, next);

      // Ele não pode vir 200
      expect(res.status.calledWith(200)).to.be.equal(false);
    });
  }); */
});
