const connection = require('../database/connection');

const querySales = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
FROM StoreManager.sales AS s 
INNER JOIN StoreManager.sales_products AS sp
ON s.id = sp.sale_id`;

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

const serializeAll = ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
  saleId, date, productId, quantity,
});

const serialize = ({ date, product_id: productId, quantity }) => ({ date, productId, quantity });

const getAllSales = async () => {
  const [result] = await connection.execute(querySales);

  return result.map(serializeAll);
};

const getSalesById = async (id) => {
  const query = `${querySales} WHERE sp.sale_id = ?`;

  const [result] = await connection.execute(query, [id]);

  if (result.length === 0) return false;
  const a = result.map(serialize)[0].date;
  console.log(typeof a);
  return result.map(serialize);
};

module.exports = { getAllProducts, getProductsById, getAllSales, getSalesById };