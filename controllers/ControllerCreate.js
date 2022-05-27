const ModelCreate = require('../models/ModelCreate');
const connection = require('../database/connection');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  await ModelCreate.createProduct(name, quantity);

  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  return res.status(201).json(result[0]);
};

module.exports = { createProduct };