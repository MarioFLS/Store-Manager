const ModelCreateSales = require('../models/ModelCreateSales');
const serviceSales = require('../services/ServiceSales');

const createSales = async (req, res) => {
  const [{ insertId }] = await ModelCreateSales.createSales();
  await ModelCreateSales.createSalesProducts(insertId, req.body);
  
  res.status(201).json({ id: insertId, itemsSold: req.body });
};

const editSales = async (req, res, next) => {
  const { id } = req.params;
  const sales = await serviceSales.editSales(id, req.body);

  if (sales.error) return next(sales.error);
  
  res.status(200).json({ saleId: id, itemUpdated: req.body });
};

const deleteSales = async (req, res, next) => {
  const { id } = req.params;
  const sales = await serviceSales.deleteSales(id);
  if (sales.error) return next(sales.error);
  
  res.status(204).json();
};

module.exports = { createSales, editSales, deleteSales };

// const [{ insertId }] = await createSales();