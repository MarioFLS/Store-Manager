const connection = require('../database/connection');

const createProduct = async (name, quantity) => {
  const query = `INSERT INTO StoreManager.products (name, quantity ) 
  VALUES (?, ?)`;

  const product = await connection.execute(query, [name, quantity]);
  return product;
};

const editProduct = async (id, name, quantity) => {
  const query = `UPDATE StoreManager.products 
    SET name = ?, quantity = ?
    WHERE id = ?`;

  const product = await connection.execute(query, [name, quantity, id]);
  return product;
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM StoreManager.products 
    WHERE id = ?`;

  const product = await connection.execute(query, [id]);
  return product;
};

module.exports = { createProduct, editProduct, deleteProduct };