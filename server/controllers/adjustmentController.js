const Adjustment = require('../models/Adjustment');

const getAllAdjustments = async (req, res) => {
  try {
    const adjustments = await Adjustment.findAll();
    res.json(adjustments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdjustmentById = async (req, res) => {
  try {
    const adjustment = await Adjustment.findById(req.params.id);
    if (!adjustment) return res.status(404).json({ error: 'Adjustment not found' });
    res.json(adjustment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAdjustment = async (req, res) => {
  try {
    const id = await Adjustment.create(req.body);
    const adjustment = await Adjustment.findById(id);
    res.status(201).json(adjustment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdjustment = async (req, res) => {
  try {
    await Adjustment.update(req.params.id, req.body);
    const adjustment = await Adjustment.findById(req.params.id);
    res.json(adjustment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAdjustment = async (req, res) => {
  try {
    await Adjustment.delete(req.params.id);
    res.json({ message: 'Adjustment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAdjustments,
  getAdjustmentById,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment
};