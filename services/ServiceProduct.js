const findProduct = require('../models/FindInTheDatabase');
const ModelCreat = require('../models/ModelCreateProduct');
const getItemsDatabase = require('../models/getItemsDatabase');

const getProductsById = async (id) => {
  const product = await getItemsDatabase.getProductsById(id);

  if (!product) return { error: { message: 'Product not found', code: 404 } };

  return product;
};
const createProduct = async (name, quantity) => {
  const product = await findProduct.findProductName(name);
  if (product.length > 0) return { error: { message: 'Product already exists', code: 409 } };

  const result = await ModelCreat.createProduct(name, quantity);
  return result;
};

const editProduct = async (id, name, quantity) => {
  const product = await findProduct.findProductId(id);
  if (product.length === 0) return { error: { message: 'Product not found', code: 404 } };

  return ModelCreat.editProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  const product = await findProduct.findProductId(id);
  if (product.length === 0) return { error: { message: 'Product not found', code: 404 } };

  return ModelCreat.deleteProduct(id);
};

module.exports = { getProductsById, createProduct, editProduct, deleteProduct };