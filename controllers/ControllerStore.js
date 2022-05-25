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

module.exports = { getAllProducts, getProductsById };