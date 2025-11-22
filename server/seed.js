const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'martispit',
  database: 'stockmaster',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createTables() {
  try {
    // Deliveries table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS deliveries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference VARCHAR(50) NOT NULL UNIQUE,
        from_location VARCHAR(100),
        to_location VARCHAR(100),
        contact VARCHAR(255),
        schedule_date DATE,
        status VARCHAR(50) DEFAULT 'Ready',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Receipts table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS receipts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference VARCHAR(50) NOT NULL UNIQUE,
        from_location VARCHAR(100),
        to_location VARCHAR(100),
        contact VARCHAR(255),
        schedule_date DATE,
        status VARCHAR(50) DEFAULT 'Ready',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Internal transfers table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS internal_transfers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transfer_id VARCHAR(50) NOT NULL UNIQUE,
        source_location VARCHAR(100),
        destination_location VARCHAR(100),
        transfer_date DATE,
        status VARCHAR(50) DEFAULT 'Draft',
        total_items INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Transfer items table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS transfer_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transfer_id INT,
        product_id INT,
        quantity INT DEFAULT 1,
        FOREIGN KEY (transfer_id) REFERENCES internal_transfers(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Inventory adjustments table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS inventory_adjustments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        current_quantity INT DEFAULT 0,
        adjusted_quantity INT DEFAULT 0,
        reason VARCHAR(255),
        adjustment_date DATE,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created or already exist');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

async function seedAllData() {
  try {
    console.log('Starting manual seeding...');

    // First create tables
    await createTables();

    // Seed deliveries
    const [deliveryCount] = await pool.execute('SELECT COUNT(*) as count FROM deliveries');
    console.log('Current delivery count:', deliveryCount[0].count);
    if (deliveryCount[0].count === 0) {
      await pool.execute(`
        INSERT INTO deliveries (reference, from_location, to_location, contact, schedule_date, status) VALUES
        ('WH/OUT/0001', 'Main Warehouse', 'vendor', 'Tech Solutions Inc', '2024-01-15', 'Done'),
        ('WH/OUT/0002', 'Main Warehouse', 'vendor', 'Global Electronics', '2024-01-16', 'Ready'),
        ('WH/OUT/0003', 'Secondary Warehouse', 'customer', 'Office Supplies Co', '2024-01-18', 'In Transit'),
        ('WH/OUT/0004', 'Main Warehouse', 'vendor', 'Fashion Wholesale', '2024-01-20', 'Ready'),
        ('WH/OUT/0005', 'Distribution Center', 'customer', 'Home & Garden Ltd', '2024-01-22', 'Done')
      `);
      console.log('Seeded deliveries');
    }

    // Seed receipts
    const [receiptCount] = await pool.execute('SELECT COUNT(*) as count FROM receipts');
    console.log('Current receipt count:', receiptCount[0].count);
    if (receiptCount[0].count === 0) {
      await pool.execute(`
        INSERT INTO receipts (reference, from_location, to_location, contact, schedule_date, status) VALUES
        ('WH/IN/0001', 'vendor', 'Main Warehouse', 'Tech Solutions Inc', '2024-01-15', 'Done'),
        ('WH/IN/0002', 'vendor', 'Main Warehouse', 'Global Electronics', '2024-01-16', 'Ready'),
        ('WH/IN/0003', 'vendor', 'Secondary Warehouse', 'Office Supplies Co', '2024-01-18', 'In Transit'),
        ('WH/IN/0004', 'vendor', 'Main Warehouse', 'Fashion Wholesale', '2024-01-20', 'Ready'),
        ('WH/IN/0005', 'vendor', 'Distribution Center', 'Home & Garden Ltd', '2024-01-22', 'Done'),
        ('WH/IN/0006', 'vendor', 'Main Warehouse', 'Beverage Distributors', '2024-01-25', 'Ready'),
        ('WH/IN/0007', 'vendor', 'Secondary Warehouse', 'Sports Equipment Inc', '2024-01-28', 'In Transit'),
        ('WH/IN/0008', 'vendor', 'Main Warehouse', 'Stationery World', '2024-01-30', 'Done'),
        ('WH/IN/0009', 'vendor', 'Distribution Center', 'Furniture Plus', '2024-02-02', 'Ready'),
        ('WH/IN/0010', 'vendor', 'Main Warehouse', 'Lighting Solutions', '2024-02-05', 'In Transit'),
        ('WH/IN/0011', 'vendor', 'Secondary Warehouse', 'Cable Manufacturers', '2024-02-08', 'Ready'),
        ('WH/IN/0012', 'vendor', 'Main Warehouse', 'Audio Tech Corp', '2024-02-10', 'Done')
      `);
      console.log('Seeded receipts');
    }

    // Seed internal transfers
    const [transferCount] = await pool.execute('SELECT COUNT(*) as count FROM internal_transfers');
    console.log('Current transfer count:', transferCount[0].count);
    if (transferCount[0].count === 0) {
      await pool.execute(`
        INSERT INTO internal_transfers (transfer_id, source_location, destination_location, transfer_date, status, total_items) VALUES
        ('IT/00001', 'Main Warehouse', 'Secondary Warehouse', '2024-01-15', 'Done', 12),
        ('IT/00002', 'Secondary Warehouse', 'Distribution Center', '2024-01-14', 'In Transit', 8),
        ('IT/00003', 'Distribution Center', 'Main Warehouse', '2024-01-14', 'Ready', 15),
        ('IT/00004', 'Main Warehouse', 'Distribution Center', '2024-01-13', 'Draft', 20),
        ('IT/00005', 'Secondary Warehouse', 'Main Warehouse', '2024-01-13', 'Done', 6),
        ('IT/00006', 'Distribution Center', 'Secondary Warehouse', '2024-01-12', 'Canceled', 10),
        ('IT/00007', 'Main Warehouse', 'Secondary Warehouse', '2024-01-12', 'In Transit', 18),
        ('IT/00008', 'Secondary Warehouse', 'Distribution Center', '2024-01-11', 'Ready', 14),
        ('IT/00009', 'Distribution Center', 'Main Warehouse', '2024-01-11', 'Done', 9),
        ('IT/00010', 'Main Warehouse', 'Distribution Center', '2024-01-10', 'Draft', 22),
        ('IT/00011', 'Secondary Warehouse', 'Main Warehouse', '2024-01-09', 'Done', 16),
        ('IT/00012', 'Main Warehouse', 'Secondary Warehouse', '2024-01-08', 'In Transit', 11),
        ('IT/00013', 'Distribution Center', 'Secondary Warehouse', '2024-01-08', 'Ready', 7),
        ('IT/00014', 'Secondary Warehouse', 'Distribution Center', '2024-01-07', 'Done', 25),
        ('IT/00015', 'Main Warehouse', 'Distribution Center', '2024-01-06', 'Draft', 19),
        ('IT/00016', 'Distribution Center', 'Main Warehouse', '2024-01-05', 'In Transit', 13),
        ('IT/00017', 'Secondary Warehouse', 'Main Warehouse', '2024-01-04', 'Ready', 21),
        ('IT/00018', 'Main Warehouse', 'Secondary Warehouse', '2024-01-03', 'Done', 8),
        ('IT/00019', 'Distribution Center', 'Secondary Warehouse', '2024-01-02', 'Canceled', 5),
        ('IT/00020', 'Secondary Warehouse', 'Distribution Center', '2024-01-01', 'Draft', 17),
        ('IT/00021', 'Main Warehouse', 'Distribution Center', '2023-12-31', 'In Transit', 14),
        ('IT/00022', 'Distribution Center', 'Main Warehouse', '2023-12-30', 'Ready', 23),
        ('IT/00023', 'Secondary Warehouse', 'Main Warehouse', '2023-12-29', 'Done', 9),
        ('IT/00024', 'Main Warehouse', 'Secondary Warehouse', '2023-12-28', 'Draft', 12),
        ('IT/00025', 'Distribution Center', 'Secondary Warehouse', '2023-12-27', 'In Transit', 18)
      `);
      console.log('Seeded internal transfers');
    }

    // Seed inventory adjustments
    const [adjustmentCount] = await pool.execute('SELECT COUNT(*) as count FROM inventory_adjustments');
    console.log('Current adjustment count:', adjustmentCount[0].count);
    if (adjustmentCount[0].count === 0) {
      await pool.execute(`
        INSERT INTO inventory_adjustments (product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status) VALUES
        ('Wireless Headphones', 150, 145, 'Damaged items', '2024-01-15', 'Applied'),
        ('Office Chair', 75, 77, 'Found in storage', '2024-01-14', 'Pending'),
        ('Cotton T-Shirt', 200, 195, 'Lost items', '2024-01-13', 'Applied'),
        ('Coffee Beans', 120, 125, 'Counting error', '2024-01-12', 'Applied'),
        ('Garden Hose', 45, 43, 'Damaged items', '2024-01-11', 'Pending'),
        ('Smartphone Case', 300, 295, 'Lost items', '2024-01-10', 'Applied'),
        ('LED Bulb', 500, 505, 'Found in storage', '2024-01-09', 'Applied'),
        ('Laptop Stand', 60, 65, 'Counting error', '2024-01-08', 'Pending'),
        ('Desk Lamp', 85, 82, 'Damaged items', '2024-01-07', 'Applied'),
        ('Mouse Pad', 180, 178, 'Lost items', '2024-01-06', 'Applied'),
        ('USB Cable', 400, 395, 'Damaged items', '2024-01-05', 'Pending'),
        ('Water Bottle', 90, 95, 'Found in storage', '2024-01-04', 'Applied'),
        ('Bluetooth Speaker', 65, 63, 'Damaged items', '2024-01-03', 'Applied'),
        ('Notebook', 250, 255, 'Counting error', '2024-01-02', 'Pending'),
        ('Pen Set', 150, 148, 'Lost items', '2024-01-01', 'Applied'),
        ('Desk Organizer', 40, 42, 'Found in storage', '2023-12-31', 'Applied'),
        ('Monitor Stand', 35, 33, 'Damaged items', '2023-12-30', 'Pending'),
        ('Keyboard', 110, 115, 'Counting error', '2023-12-29', 'Applied'),
        ('Mouse', 130, 128, 'Lost items', '2023-12-28', 'Applied'),
        ('External Hard Drive', 25, 27, 'Found in storage', '2023-12-27', 'Pending')
      `);
      console.log('Seeded inventory adjustments');
    }

    console.log('Manual seeding completed successfully!');
  } catch (error) {
    console.error('Error during manual seeding:', error);
  } finally {
    process.exit(0);
  }
}

seedAllData();