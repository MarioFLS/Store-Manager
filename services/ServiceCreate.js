const { findProductName, findProductId } = require('../models/FindDatabaseItem');
const ModelCreat = require('../models/ModelCreateProduct');

const createProduct = async (name, quantity) => {
  const product = await findProductName(name);
  if (product.length > 0) return { error: { message: 'Product already exists', code: 409 } };
  
  const result = await ModelCreat.createProduct(name, quantity);
  return result;
};

const editProduct = async (id, name, quantity) => {
  const product = await findProductId(id);
  if (product.length === 0) return { error: { message: 'Product not found', code: 404 } };
  
  return ModelCreat.editProduct(id, name, quantity);
};

module.exports = { createProduct, editProduct };