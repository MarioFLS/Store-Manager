const { findSalesId } = require('../models/FindInTheDatabase');
const getItemsDatabase = require('../models/getItemsDatabase');
const ModelCreateSales = require('../models/ModelCreateSales');

const getSalesById = async (id) => {
  const product = await getItemsDatabase.getSalesById(id);

  if (!product) return { error: { message: 'Sale not found', code: 404 } };

  return product;
};

const editSales = async (saleId, arrBody) => {
  const sales = await findSalesId(saleId);
  if (sales.length === 0) return { error: { message: 'Sale not found', code: 404 } };
  
  return ModelCreateSales.editSalesProducts(saleId, arrBody);
};

const deleteSales = async (saleId) => {
  const sales = await findSalesId(saleId);
  if (sales.length === 0) return { error: { message: 'Sale not found', code: 404 } };
  return ModelCreateSales.deleteSales(saleId);
};

module.exports = { getSalesById, editSales, deleteSales };