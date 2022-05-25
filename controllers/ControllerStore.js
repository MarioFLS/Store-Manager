const rescue = require('express-rescue');
const ModelStore = require('../models/ModelStore');
const ServiceStore = require('../services/ServiceStore');

const getAllProducts = rescue(async (_req, res) => {
  const result = await ModelStore.getAllProducts();
  return res.status(200).json(result);
});

const getProductsById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await ServiceStore.getProductsById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(200).json(product[0]);
});

const getAllSales = rescue(async (_req, res) => {
  const result = await ModelStore.getAllSales();
  return res.status(200).json(result);
});

const getSalesById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await ServiceStore.getSalesById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(200).json(product);
});
module.exports = { getAllProducts, getProductsById, getAllSales, getSalesById };