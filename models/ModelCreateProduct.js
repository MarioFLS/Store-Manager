const connection = require('../database/connection');

const createProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity ) 
  VALUES (?, ?)`;

  const product = connection.execute(query, [name, quantity]);
  return product;
};

const editProduct = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products 
    SET name = ?, quantity = ?
    WHERE id = ?`;

  const product = await connection.execute(query, [name, quantity, id]);
  return product;
};

module.exports = { createProduct, editProduct };