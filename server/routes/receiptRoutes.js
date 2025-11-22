const express = require('express');
const router = express.Router();
const {
  getAllReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt
} = require('../controllers/receiptController');

router.get('/', getAllReceipts);
router.get('/:id', getReceiptById);
router.post('/', createReceipt);
router.put('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);

module.exports = router;