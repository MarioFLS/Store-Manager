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

module.exports = { createSales, createSalesProducts };