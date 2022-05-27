const ServiceCreate = require('../services/ServiceCreate');
const { findProduct } = require('../models/FindDatabaseItem');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await ServiceCreate.createProduct(name, quantity);
  
  if (product.error) return next(product.error);
  
  const [result] = await findProduct(name);
  return res.status(201).json(result);
};

module.exports = { createProduct };