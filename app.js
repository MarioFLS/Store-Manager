require('express-async-errors');
const bodyParser = require('body-parser');
const express = require('express');
const CreateProducts = require('./controllers/ControllerCreateProduct');
const CreateSales = require('./controllers/ControllerCreateSales');
const Products = require('./controllers/ControllerStore');
const errorMiddleware = require('./middlewares/error');
const productsValidation = require('./middlewares/productsValidation');
const salesValidation = require('./middlewares/salesValidation');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.get('/products', Products.getAllProducts);
app.get('/products/:id', Products.getProductsById);

app.get('/sales', Products.getAllSales);
app.get('/sales/:id', Products.getSalesById);

app.post('/products', productsValidation, CreateProducts.createProduct);
app.put('/products/:id', productsValidation, CreateProducts.editProduct);
app.delete('/products/:id', CreateProducts.deleteProduct);

app.post('/sales', salesValidation, CreateSales.createSales);

app.put('/sales/:id', salesValidation, CreateSales.EditSales);

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
