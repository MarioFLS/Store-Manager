const sinon = require("sinon");
const { expect } = require("chai");
const CreateProduct = require('../../../controllers/ControllerCreateProduct');
const connection = require('../../../database/connection');
const findItem = require('../../../models/FindInTheDatabase');
const ServiceStore = require('../../../services/ServiceProduct');
const { object } = require("joi");


describe("Testando a Camada de Controller - Teste de Produtos", () => {

  describe("Criando Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      req.body = { "name": "Martelo do Thor", "quantity": 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves([[]]);
      sinon.stub(ServiceStore, 'createProduct').resolves([[]]);

    });

    afterEach(() => {
      connection.execute.restore();
    })

    it("Retorno do Status quando o produto é criado", async () => {
      await CreateProduct.createProduct(req, res, next);

      expect(res.status.calledWith(201)).to.be.equal(true);
      ServiceStore.createProduct.restore();
    });
  });

  describe("Teste de Editar o Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[{
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]];
      req.params = { id: 1 };
      req.body = { "name": "produto", "quantity": 15 }
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceStore, 'editProduct').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando o produto é editado com sucesso", async () => {
      await CreateProduct.editProduct(req, res, next);

      expect(res.status.calledWith(200)).to.be.equal(true);
      ServiceStore.editProduct.restore();
    });
  });

  describe("Teste para deletar um Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[{
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]];
      req.params = { id: 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceStore, 'deleteProduct').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando deletar um produto", async () => {
      await CreateProduct.deleteProduct(req, res, next);

      expect(res.status.calledWith(204)).to.be.equal(true);
      ServiceStore.deleteProduct.restore();
    });
  });
});

describe('Testando Erro em Controller - Teste de Produtos', () => {
  describe("Criando Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[{
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }]];
      req.body = { "name": "Martelo do Thor", "quantity": 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceStore, 'createProduct').resolves({ error: { message: 'Product already exists', code: 404 } });

    });

    afterEach(() => {
      connection.execute.restore();
    })

    it("Retorno Erro quando já existir um Produto com esse nome", async () => {
      await CreateProduct.createProduct(req, res, next);
      expect(next.calledWith({ message: 'Product already exists', code: 404 })).to.be.equal(true);
      ServiceStore.createProduct.restore();
    });
  });

  describe("Teste de Editar o Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[]];
      req.params = { id: 30 };
      req.body = { "name": "produto", "quantity": 15 }
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceStore, 'editProduct').resolves({ error: { message: 'Product not found', code: 404 } });
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando o produto é editado com sucesso", async () => {
      await CreateProduct.editProduct(req, res, next);

      expect(next.calledWith({ message: 'Product not found', code: 404 })).to.be.equal(true);
      ServiceStore.editProduct.restore();
    });
  });

  describe("Deletar Produto pelo ID", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[]];
      req.params = { id: 20 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceStore, 'deleteProduct').resolves({ error: { message: 'Product not found', code: 404 } });
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await CreateProduct.deleteProduct(req, res, next);

      expect(next.calledWith({ message: 'Product not found', code: 404 })).to.be.equal(true);
      ServiceStore.deleteProduct.restore();
    });
  });
});
