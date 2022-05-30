const ServiceCreate = require('../services/ServiceProduct');
const { findProductId, findProductName } = require('../models/FindInTheDatabase');

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

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await ServiceCreate.deleteProduct(id);

  if (product.error) return next(product.error);

  return res.status(204).json();
};

module.exports = { createProduct, editProduct, deleteProduct };