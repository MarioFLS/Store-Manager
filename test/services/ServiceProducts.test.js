const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../database/connection');
const ServiceStore = require('../../services/ServiceProduct');
const findItems = require('../../models/FindInTheDatabase');

describe("Testando Camada de Service - Products", () => {
  describe("Testando Erros de Service", () => {
    describe('Caso não exista produto com o ID correspondente', () => {
      beforeEach(() => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => {
        connection.execute.restore();
      });

      it('O retorno deve ser uma mensagem', async () => {
        const getProductsById = await ServiceStore.getProductsById(90);
        expect(getProductsById).to.deep
          .equal({ error: { message: 'Product not found', code: 404 } });
      })
    });

    describe("Testando função de Criar Produtos", () => {
      beforeEach(() => {
        const execute = [[
          {
            "id": 2,
            "name": "Traje de encolhimento",
            "quantity": 20
          }
        ]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => { connection.execute.restore() });
      it('Saida esperada da Criação de um Produto', async () => {
        const name = "Traje de encolhimento"
        const product = await ServiceStore.createProduct(name, 20);
        expect(product).to.deep.equal({ error: { message: 'Product already exists', code: 409 } });
      });
    });

    describe("Testando função de editar Produtos", () => {
      beforeEach(() => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
        sinon.stub(findItems, 'findProductId').resolves(execute[0]);
      });
      afterEach(() => { connection.execute.restore() });
      it('Testando se o Produto foi editado', async () => {
        findItems.findProductId.restore()
        const name = "Traje de encolhimento"
        const product = await ServiceStore.editProduct(2, name, 20)
        expect(product).to.deep.equal({ error: { message: 'Product not found', code: 404 } });
      });
    });

    describe("Testando função de Deletar Produtos", () => {
      beforeEach(() => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
        sinon.stub(findItems, 'findProductId').resolves(execute[0]);
      });
      afterEach(() => { connection.execute.restore() });
      it('Testando Se o Produto foi deletado', async () => {
        findItems.findProductId.restore()
        const product = await ServiceStore.deleteProduct(2)

        expect(product).to.deep.equal({ error: { message: 'Product not found', code: 404 } });
      });
    });
  });
});