const Delivery = require('../models/Delivery');

const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDelivery = async (req, res) => {
  try {
    const id = await Delivery.create(req.body);
    const delivery = await Delivery.findById(id);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDelivery = async (req, res) => {
  try {
    await Delivery.update(req.params.id, req.body);
    const delivery = await Delivery.findById(req.params.id);
    res.json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDelivery = async (req, res) => {
  try {
    await Delivery.delete(req.params.id);
    res.json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery
};