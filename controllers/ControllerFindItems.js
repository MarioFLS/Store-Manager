const ModelStore = require('../models/getItemsDatabase');
const ServiceStore = require('../services/ServiceSales');
const ServiceProduct = require('../services/ServiceProduct');

const getAllProducts = async (_req, res) => {
  const result = await ModelStore.getAllProducts();
  return res.status(200).json(result);
};

const getProductsById = async (req, res, next) => {
  const { id } = req.params;

  const product = await ServiceProduct.getProductsById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(200).json(product[0]);
};

const getAllSales = async (_req, res) => {
  const result = await ModelStore.getAllSales();
  return res.status(200).json(result);
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;

  const product = await ServiceStore.getSalesById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(200).json(product);
};
module.exports = { getAllProducts, getProductsById, getAllSales, getSalesById };