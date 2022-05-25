const ModelStore = require('../models/ModelStore');

const getProductsById = async (id) => {
  const product = await ModelStore.getProductsById(id);

  if (!product) return { error: { message: 'Product not found', code: 404 } };

  return product;
};

const getSalesById = async (id) => {
  const product = await ModelStore.getSalesById(id);

  if (!product) return { error: { message: 'Sale not found', code: 404 } };

  return product;
};
module.exports = { getProductsById, getSalesById };