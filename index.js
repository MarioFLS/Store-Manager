const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();
const { getAllProducts, getProductsById } = require('./controllers/ControllerStore');
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());
app.get('/products', getAllProducts);
app.get('/products/:id', getProductsById);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
