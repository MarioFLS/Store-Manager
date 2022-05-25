const connection = require('../database/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';

  const [result] = await connection.execute(query);

  return result;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  const [result] = await connection.execute(query, [id]);

  if (result.length === 0) return false;
  return result;
};

module.exports = { getAllProducts, getProductsById };