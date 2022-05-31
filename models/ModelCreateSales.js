const connection = require('../database/connection');

const createSales = async () => {
  const query = `INSERT INTO StoreManager.sales (date) 
  VALUES (NOW())`;

  const sales = await connection.execute(query);
  return sales;
};

const createSalesProducts = async (salesId, arrBody) => {
  const queryCreateSales = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (?, ?, ?)`;

  const queryUpdate = `UPDATE StoreManager.products AS p, StoreManager.sales_products AS s
  SET p.quantity = p.quantity - s.quantity
  WHERE s.sale_id = ? AND p.id = ?;`;

  const sales = await Promise.all(arrBody.map(({ productId, quantity }) => {
    connection.execute(queryCreateSales, [salesId, productId, quantity]);
    return connection.execute(queryUpdate, [salesId, productId]);
  }));
  return sales;
};

const editSalesProducts = async (salesId, arrBody) => {
  const queryProductUpdate = `UPDATE StoreManager.products AS p, StoreManager.sales_products AS s
  SET p.quantity = (
  IF((? < s.quantity), (p.quantity - (? - s.quantity)), (p.quantity + (s.quantity - ?)))
  ) WHERE s.product_id = ? AND p.id = ? AND s.product_id = ?  ;`;

  const querySalesUpdate = `UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity = ?
  WHERE sale_id = ? AND product_id = ?;`;

  const sales = await Promise.all(arrBody.map(({ productId, quantity }) => {
    connection.execute(queryProductUpdate, [quantity, quantity, quantity, productId,
      productId, productId]);
    return connection.execute(querySalesUpdate, [productId, quantity, salesId, productId]);
  }));
  return sales;
};

const deleteSales = async (saleId) => {
  const queryUpdate = `UPDATE StoreManager.products AS p, StoreManager.sales_products AS s
  SET p.quantity = p.quantity + s.quantity`;

  const queryDelete = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';

  await connection.execute(queryUpdate, [saleId]);
  const sales = await connection.execute(queryDelete, [saleId]);
  return sales;
};

module.exports = { createSales, createSalesProducts, editSalesProducts, deleteSales };