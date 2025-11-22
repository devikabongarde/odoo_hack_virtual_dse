const InternalTransfer = require('../models/InternalTransfer');

const getAllTransfers = async (req, res) => {
  try {
    const transfers = await InternalTransfer.findAll();
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransferById = async (req, res) => {
  try {
    const transfer = await InternalTransfer.findById(req.params.id);
    if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
    res.json(transfer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransfer = async (req, res) => {
  try {
    const id = await InternalTransfer.create(req.body);
    const transfer = await InternalTransfer.findById(id);
    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTransfer = async (req, res) => {
  try {
    await InternalTransfer.update(req.params.id, req.body);
    const transfer = await InternalTransfer.findById(req.params.id);
    res.json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransfer = async (req, res) => {
  try {
    await InternalTransfer.delete(req.params.id);
    res.json({ message: 'Transfer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer
};