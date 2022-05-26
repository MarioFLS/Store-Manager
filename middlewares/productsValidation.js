const Joi = require('joi');

const requiredNonEmptyString = Joi.string().not().empty().required();
const validateProduct = Joi.object({
  name: requiredNonEmptyString.min(5),
  quantity: Joi.number().not().empty().required()
.min(1),
});

const validadeteBodyProduct = (req, res, next) => {
  const { error } = validateProduct.validate(req.body);
  if (error) {
    if (error.details[0].type === 'string.min' || error.details[0].type === 'number.min') {
      return res.status(422).json({ message: error.details[0].message });
    }
    return res.status(400).json({ message: error.details[0].message });
  }
  return next();
};

module.exports = validadeteBodyProduct;