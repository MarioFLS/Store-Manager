const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../database/connection');
const ServiceStore = require('../../../services/ServiceProduct');

describe("Testando Camada de Service - Products", () => {

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
      const response = await ServiceStore.getProductsById(2);

      expect(response).to.be.a("array");
      expect(response).to.deep.equal([{ id: 2, name: 'Traje de encolhimento', quantity: 20 }]);
    });
  });

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
  })
});

describe('Criação de Produto, Casos de sucesso', () => {
  describe('Criando um Produto', () => {
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

    it('Retorno Caso exista um Produto já com esse nome', async () => {
      const nome = 'Traje de encolhimento';
      const getProductsById = await ServiceStore.createProduct(nome, 2);
      console.log(getProductsById);
      expect(getProductsById).to.deep
        .equal({ error: { message: 'Product already exists', code: 409 } });
    })
  });

  describe('Editando um Produto', () => {
    beforeEach(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno Caso não exista um produto com esse ID', async () => {
      const nome = 'Traje de encolhimento';
      const getProductsById = await ServiceStore.editProduct(1, nome, 10);
      console.log(getProductsById);
      expect(getProductsById).to.deep
        .equal({ error: {  message: 'Product not found', code: 404 } });
    })
  });

  describe('Deletando um Produto', () => {
    beforeEach(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno Caso exista um Produto já com esse nome', async () => {
      const getProductsById = await ServiceStore.deleteProduct(2);
      console.log(getProductsById);
      expect(getProductsById).to.deep
        .equal({ error: {  message: 'Product not found', code: 404 } });
    })
  })
});

describe('Criação de Produto, Casos de erro', () => {
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

  describe('Deletando um Produto', () => {
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
    afterEach(() => {
      connection.execute.restore();
    });

    it('Retorno Caso exista um Produto já com esse nome', async () => {
      const getProductsById = await ServiceStore.deleteProduct(2);
      console.log(getProductsById);
      expect(getProductsById).to.be.a('array');
    })
  })
});