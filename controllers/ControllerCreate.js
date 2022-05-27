const ServiceCreate = require('../services/ServiceCreate');
const ModelCreate = require('../models/ModelCreateProduct');
const { findProductId, findProductName } = require('../models/FindDatabaseItem');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await ServiceCreate.createProduct(name, quantity);

  if (product.error) return next(product.error);

  const [result] = await findProductName(name);
  return res.status(201).json(result);
};

const editProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ServiceCreate.editProduct(id, name, quantity);

  if (product.error) return next(product.error);

  const [result] = await findProductId(id);
  return res.status(200).json(result);
};

module.exports = { createProduct, editProduct };