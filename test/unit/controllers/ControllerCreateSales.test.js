const sinon = require("sinon");
const { expect } = require("chai");
const connection = require('../../../database/connection');
const CreateSales = require('../../../controllers/ControllerCreateSales');
const ServiceSales = require('../../../services/ServiceSales');
const ModelSales = require('../../../services/ServiceSales');


describe("Testando a Camada de Controller - Teste de Vendas", () => {

  describe("Criando Venda", () => {
    const req = {};
    const res = {};
    beforeEach(() => {
      req.body = [
        {
          "productId": 1,
          "quantity": 10
        }
      ]
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves([[]]);

    });

    afterEach(() => {
      connection.execute.restore();
    })

    it("Retorno do Status quando o produto é criado", async () => {
      await CreateSales.createSales(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe("Teste de Editar a venda", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [{ sale_id: 1, product_id: 1, quantity: 12 }];
      req.params = { id: 1 };
      req.body = [{
        "productId": 1,
        "quantity": 12
      },]
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceSales, 'editSales').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando o produto é editado com sucesso", async () => {
      await CreateSales.editSales(req, res, next);

      expect(res.status.calledWith(200)).to.be.equal(true);
      ServiceSales.editSales.restore();
    });
  });

  describe("Teste para deletar uma venda", () => {
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
      sinon.stub(ServiceSales, 'deleteSales').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando deletar um produto", async () => {
      await CreateSales.deleteSales(req, res, next);

      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith()).to.be.equal(true);
      ServiceSales.deleteSales.restore();
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
      sinon.stub(ServiceSales, 'createProduct').resolves({ error: { message: 'Product already exists', code: 404 } });

    });

    afterEach(() => {
      connection.execute.restore();
    })

    it("Retorno Erro quando já existir um Produto com esse nome", async () => {
      await CreateSales.createProduct(req, res, next);
      expect(next.calledWith({ message: 'Product already exists', code: 404 })).to.be.equal(true);
      ServiceSales.createProduct.restore();
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
      sinon.stub(ServiceSales, 'editProduct').resolves({ error: { message: 'Product not found', code: 404 } });
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando o produto é editado com sucesso", async () => {
      await CreateSales.editProduct(req, res, next);

      expect(next.calledWith({ message: 'Product not found', code: 404 })).to.be.equal(true);
      ServiceSales.editProduct.restore();
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
      sinon.stub(ServiceSales, 'deleteProduct').resolves({ error: { message: 'Product not found', code: 404 } });
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno do Status quando falha", async () => {
      await CreateSales.deleteProduct(req, res, next);

      expect(next.calledWith({ message: 'Product not found', code: 404 })).to.be.equal(true);
      ServiceSales.deleteProduct.restore();
    });
  });
});
