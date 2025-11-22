const Warehouse = require('../models/Warehouse');

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWarehouse = async (req, res) => {
  try {
    const id = await Warehouse.create(req.body);
    const warehouse = await Warehouse.findById(id);
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    await Warehouse.update(req.params.id, req.body);
    const warehouse = await Warehouse.findById(req.params.id);
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};