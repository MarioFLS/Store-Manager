const ModelCreateSales = require('../models/ModelCreateSales');

const createSales = async (req, res) => {
  const [{ insertId }] = await ModelCreateSales.createSales();
  await ModelCreateSales.createSalesProducts(insertId, req.body);
  
  res.status(201).json({ id: insertId, itemsSold: req.body });
};

const EditSales = async (req, res) => {
  const { id } = req.params;
  await ModelCreateSales.EditSalesProducts(id, req.body);
  
  res.status(200).json({ saleId: id, itemUpdated: req.body });
};

module.exports = { createSales, EditSales };

// const [{ insertId }] = await createSales();