const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const id = await Supplier.create(req.body);
    const supplier = await Supplier.findById(id);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    await Supplier.update(req.params.id, req.body);
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};