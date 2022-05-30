const ModelCreateSales = require('../models/ModelCreateSales');

const createSales = async (req, res) => {
  const arrBody = req.body;
  const [{ insertId }] = await ModelCreateSales.createSales();
  await ModelCreateSales.createSalesProducts(insertId, arrBody);
  res.status(201).json({
    id: insertId,
    itemsSold: arrBody,
  });
};

module.exports = { createSales };

// const [{ insertId }] = await createSales();