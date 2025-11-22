const Receipt = require('../models/Receipt');

const getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.findAll();
    console.log('Receipts:', receipts);
    res.json(receipts);
  } catch (error) {
    console.error('Error in getAllReceipts:', error);
    res.status(500).json({ error: error.message });
  }
};

const getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReceipt = async (req, res) => {
  try {
    const id = await Receipt.create(req.body);
    const receipt = await Receipt.findById(id);
    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReceipt = async (req, res) => {
  try {
    await Receipt.update(req.params.id, req.body);
    const receipt = await Receipt.findById(req.params.id);
    res.json(receipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReceipt = async (req, res) => {
  try {
    await Receipt.delete(req.params.id);
    res.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt
};