const connection = require('../database/connection');

const findProductName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  return result;
};

const findProductId = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const findSalesId = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = { findProductName, findProductId, findSalesId };