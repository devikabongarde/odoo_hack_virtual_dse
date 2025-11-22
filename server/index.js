const express = require('express');
const cors = require('cors');
require('./db'); // Initialize database connection and seeding

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/receipts', require('./routes/receiptRoutes'));
app.use('/api/transfers', require('./routes/transferRoutes'));
app.use('/api/adjustments', require('./routes/adjustmentRoutes'));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});