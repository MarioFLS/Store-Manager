const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();
require('express-async-errors');
const { getAllProducts, getProductsById,
getAllSales, getSalesById } = require('./controllers/ControllerStore');
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());
app.get('/products', getAllProducts);
app.get('/products/:id', getProductsById);

app.get('/sales', getAllSales);
app.get('/sales/:id', getSalesById);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
