const Joi = require('joi');

const validateProduct = Joi.object({
  productId: Joi.number().not().empty().required()
    .min(1),
  quantity: Joi.number().not().empty().required()
    .min(1),
});

const salesValidation = (req, res, next) => {
  req.body.forEach((sale) => {
    const { error } = validateProduct.validate(sale);
    if (error) {
      if (error.details[0].type === 'number.min') {
        return res.status(422).json({ message: error.details[0].message });
      }
      return res.status(400).json({ message: error.details[0].message });
    }
  });

  next();
};

module.exports = salesValidation;