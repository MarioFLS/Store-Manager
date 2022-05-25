const app = require('./app');
require('dotenv').config();
const ModelStore = require('./models/ModelStore');

app.get('/products', async (_req, res) => {
  const result = await ModelStore.getAllProducts();
  res.status(200).json(result);
});

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
