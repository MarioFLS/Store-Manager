const { expect } = require("chai");
const sinon = require('sinon');
const connection = require('../../database/connection');
const ServiceStore = require('../../services/ServiceSales');


describe("Testando Camada de Models - Sales", () => {

  describe("Busca da venda Pelo ID", () => {
    beforeEach(() => {
      const execute = [[
        {
          date: "2022-06-01 00:35:18",
          product_id: 3,
          quantity: 15
        },
      ]];
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna um array com a venda que possua o ID correto", async () => {
      const response = await ServiceStore.getSalesById(2);

      expect(response).to.be.a("array");
      expect(response).to.deep.equal([
        {
          "date": "2022-06-01 00:35:18",
          "productId": 3,
          "quantity": 15
        }
      ])
    });
  });

  describe("Edição da venda pelo ID", () => {
    const execute = [{
      "productId": 1,
      "quantity": 2
    },];
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna um array com a venda que possua o ID correto", async () => {
      const response = await ServiceStore.editSales(2, execute);

      expect(response).to.be.a("array");
    });
  });

  describe("Deletar venda Pelo ID", () => {
    const execute = [{
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 5
    }];
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });
    it("Retorna um array com a venda que possua o ID correto", async () => {
      const response = await ServiceStore.deleteSales(2, execute);

      expect(response).to.be.a("array");
    });
  });
});

describe("Casos de Erro", () => {
  const execute = [[]];
  beforeEach(() => {
    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
  it("Caso não possua nenhuma venda com o ID", async () => {
    const response = await ServiceStore.getSalesById(20);

    expect(response).to.deep.equal({ error: { message: 'Sale not found', code: 404 } });
  });
  it("Caso não possua nenhuma venda com o ID", async () => {
    const body = [{
      "productId": 1,
      "quantity": 2
    },]
    const response = await ServiceStore.editSales(20, body);

    expect(response).to.deep.equal({ error: { message: 'Sale not found', code: 404 } });
  });
  it("Caso não possua nenhuma venda com o ID", async () => {
    const response = await ServiceStore.deleteSales(20);

    expect(response).to.deep.equal({ error: { message: 'Sale not found', code: 404 } });
  });
});