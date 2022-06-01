const { findProductId, findSalesId } = require('../models/FindInTheDatabase');

const quantityValidationCreate = async (req, res, next) => {
  const productQuantity = await Promise.all(req.body.map(async ({ productId, quantity }) => {
    const product = await findProductId(productId);
    return (product[0].quantity - quantity) < 0;
  }));
  if (productQuantity.some((conditional) => conditional)) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  return next();
};

const quantityValidationUpdate = async (req, res, next) => {
  const { id } = req.params;
  const productQuantity = await Promise.all(req.body.map(async ({ productId, quantity }, index) => {
    const product = await findProductId(productId);
    const sales = await findSalesId(id);
    return ((product[0].quantity + sales[index].quantity) - quantity) < 0;
  }));
  if (productQuantity.some((conditional) => conditional)) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  return next();
};

module.exports = { quantityValidationCreate, quantityValidationUpdate };
