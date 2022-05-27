const connection = require('../database/connection');

const findProduct = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  return result;
};

module.exports = { findProduct };