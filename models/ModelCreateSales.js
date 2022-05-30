const connection = require('../database/connection');

const createSales = async () => {
  const query = `INSERT INTO StoreManager.sales (date) 
  VALUES (NOW())`;

  const sales = await connection.execute(query);
  return sales;
};

const createSalesProducts = async (salesId, arrBody) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (?, ?, ?)`;

  const sales = await Promise.all(arrBody.map(({ productId, quantity }) =>
    connection.execute(query, [salesId, productId, quantity])));
  return sales;
};

const editSalesProducts = async (saleId, arrBody) => {
  const query = `UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity = ?
  WHERE sale_id = ? AND product_id = ? `;

  const sales = await Promise.allSettled(arrBody.map(({ productId, quantity }) =>
    connection.execute(query, [productId, quantity, saleId, productId])));
  return sales;
};

const deleteSales = async (saleId) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';

  const sales = await connection.execute(query, [saleId]);
  return sales;
};

module.exports = { createSales, createSalesProducts, editSalesProducts, deleteSales };