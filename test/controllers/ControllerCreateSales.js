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
  describe("Teste de Editar o Produto", () => {
    const req = {};
    const res = {};
    const next = sinon.stub().returns();
    beforeEach(() => {
      const execute = [[]];
      req.params = { id: 30 };
      req.body = [{
        "productId": 1,
        "quantity": 12
      },]
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(connection, 'execute').resolves(execute);
      sinon.stub(ServiceSales, 'editSales').resolves({ error: { message: 'Sale not found', code: 404 } });
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno quando não acha uma venda que possa ser editada", async () => {
      await CreateSales.editSales(req, res, next);

      expect(next.calledWith({ message: 'Sale not found', code: 404 })).to.be.equal(true);
      ServiceSales.editSales.restore();
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
      sinon.stub(ServiceSales, 'deleteSales').resolves({ error: { message: 'Sale not found', code: 404 } });
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorno quando Falha em achar uma venda para Deletar", async () => {
      await CreateSales.deleteSales(req, res, next);

      expect(next.calledWith({ message: 'Sale not found', code: 404 })).to.be.equal(true);
      ServiceSales.deleteSales.restore();
    });
  });
});
