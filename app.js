const bodyParser = require('body-parser');
const express = require('express');
const { createProduct } = require('./controllers/ControllerCreate');
require('express-async-errors');
const { getAllProducts, getProductsById,
  getAllSales, getSalesById } = require('./controllers/ControllerStore');
const errorMiddleware = require('./middlewares/error');
const productsValidation = require('./middlewares/productsValidation');
const salesValidation = require('./middlewares/salesValidation');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.get('/products', getAllProducts);
app.get('/products/:id', getProductsById);

app.get('/sales', getAllSales);
app.get('/sales/:id', getSalesById);

app.post('/products', productsValidation, createProduct);

app.post('/sales', salesValidation, (req, res) => {
  res.status(200).json({ message: 'Funcionou' });
});

app.put('/products/:id', productsValidation, (req, res) => {
  res.status(200).json({ message: 'Funcionou' });
});

app.put('/sales/:id', salesValidation, (req, res) => {
  res.status(200).json({ message: 'Funcionou' });
});

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
