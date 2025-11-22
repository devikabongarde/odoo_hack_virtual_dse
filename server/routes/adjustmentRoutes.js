const express = require('express');
const router = express.Router();
const {
  getAllAdjustments,
  getAdjustmentById,
  createAdjustment,
  updateAdjustment,
  deleteAdjustment
} = require('../controllers/adjustmentController');

router.get('/', getAllAdjustments);
router.get('/:id', getAdjustmentById);
router.post('/', createAdjustment);
router.put('/:id', updateAdjustment);
router.delete('/:id', deleteAdjustment);

module.exports = router;