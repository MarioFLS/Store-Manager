const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../database/connection');
const ServiceStore = require('../../services/ServiceProduct');

describe("Testando Camada de Service Sucessos - Products", () => {
  describe("Buscando Produto pela ID", () => {
    beforeEach(() => {
      const execute = [[
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }
      ]];
      sinon.stub(connection, "execute").resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorna array com todos os itens", async () => {
      const [response] = await ServiceStore.getProductsById(2);

      expect(response).to.deep.equal({ id: 2, name: 'Traje de encolhimento', quantity: 20 });
    });
  });

  describe('Testando a Criação de Produto', () => {
    describe('Criando um Produto', () => {
      beforeEach(() => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => {
        connection.execute.restore();
      });

      it('Retorno Caso exista um Produto já com esse nome', async () => {
        const nome = 'Traje de encolhimento';
        const getProductsById = await ServiceStore.createProduct(nome, 2);
        expect(getProductsById).to.be.a('array');
      })
    });

    describe('Editando um Produto', () => {
      beforeEach(() => {
        const execute = [[{
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => {
        connection.execute.restore();
      });
  
      it('Retorno Caso não exista um produto com esse ID', async () => {
        const nome = 'Traje de encolhimento';
        const getProductsById = await ServiceStore.editProduct(1, nome, 10);
        expect(getProductsById).to.be.a('array');
      })
    });
    describe("Testando função de Deletar Produtos", () => {
      beforeEach(() => {
        const execute = [{ id: 1, name: 'Traje de encolhimento', quantity: 20 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      afterEach(() => { connection.execute.restore() });
      it('Testando Se o Produto foi deletado', async () => {
        const product = await ServiceStore.deleteProduct('1');

        expect(product).to.deep.a('array');
      });
    });
  });
});
