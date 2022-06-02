require('express-async-errors');
const bodyParser = require('body-parser');
const express = require('express');
const CreateProducts = require('./controllers/ControllerCreateProduct');
const CreateSales = require('./controllers/ControllerCreateSales');
const Products = require('./controllers/ControllerFindItems');
const errorMiddleware = require('./middlewares/error');
const productsValidation = require('./middlewares/productsValidation');
const { quantityValidationCreate,
  quantityValidationUpdate } = require('./middlewares/quantityValidation');
const salesValidation = require('./middlewares/salesValidation');

const app = express();

app.use(bodyParser.json());

app.get('/products', Products.getAllProducts);
app.get('/products/:id', Products.getProductsById);

app.get('/sales', Products.getAllSales);
app.get('/sales/:id', Products.getSalesById);

app.post('/products', productsValidation, CreateProducts.createProduct);
app.put('/products/:id', productsValidation, CreateProducts.editProduct);
app.delete('/products/:id', CreateProducts.deleteProduct);

app.post('/sales', salesValidation, quantityValidationCreate, CreateSales.createSales);
app.put('/sales/:id', salesValidation, quantityValidationUpdate, CreateSales.editSales);
app.delete('/sales/:id', CreateSales.deleteSales);

app.use(errorMiddleware);

module.exports = app;
