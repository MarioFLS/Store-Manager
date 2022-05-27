const connection = require('../database/connection');

const createProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity ) 
  VALUES (?, ?)`;

  const product = connection.execute(query, [name, quantity]);
  return product;
};

module.exports = { createProduct };