const { findProduct } = require('../models/FindDatabaseItem');
const ModelCreat = require('../models/ModelCreate');

const createProduct = async (name, quantity) => {
  const product = await findProduct(name);
  if (product.length > 0) return { error: { message: 'Product already exists', code: 409 } };
  
  const result = await ModelCreat.createProduct(name, quantity);
  return result;
};

module.exports = { createProduct };