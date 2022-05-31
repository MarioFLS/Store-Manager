const { findProductId } = require('../models/FindInTheDatabase');

const quantityValidation = async (req, res, next) => {
  const productQuantity = await Promise.all(req.body.map(async ({ productId, quantity }) => {
    const product = await findProductId(productId);
    return (product[0].quantity - quantity) < 0;
}));
  if (productQuantity.some((conditional) => conditional)) { 
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
}
  return next();
};

module.exports = quantityValidation;
