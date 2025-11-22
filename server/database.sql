-- StockMaster Database Schema
-- Run this SQL script to create the database and tables

CREATE DATABASE IF NOT EXISTS stockmaster;
USE stockmaster;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    quantity INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Warehouses table
CREATE TABLE IF NOT EXISTS warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer VARCHAR(255),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    price DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO products (name, sku, quantity, price) VALUES
('Wireless Headphones', 'WH-001', 150, 89.99),
('Office Chair', 'OC-002', 75, 249.99),
('Cotton T-Shirt', 'CT-003', 200, 19.99),
('Coffee Beans', 'CB-004', 120, 34.99),
('Garden Hose', 'GH-005', 45, 29.99),
('Smartphone Case', 'SC-006', 300, 14.99),
('LED Bulb', 'LB-007', 500, 8.99),
('Laptop Stand', 'LS-008', 60, 49.99),
('Desk Lamp', 'DL-009', 85, 39.99),
('Mouse Pad', 'MP-010', 180, 12.99),
('USB Cable', 'UC-011', 400, 9.99),
('Water Bottle', 'WB-012', 90, 24.99),
('Bluetooth Speaker', 'BS-013', 65, 79.99),
('Notebook', 'NB-014', 250, 4.99),
('Pen Set', 'PS-015', 150, 16.99),
('Desk Organizer', 'DO-016', 40, 34.99),
('Monitor Stand', 'MS-017', 35, 69.99),
('Keyboard', 'KB-018', 110, 119.99),
('Mouse', 'MO-019', 130, 39.99),
('External Hard Drive', 'EH-020', 25, 149.99);

INSERT INTO warehouses (name, location) VALUES
('Main Warehouse', '123 Warehouse Ave');

INSERT INTO suppliers (name, contact) VALUES
('Default Supplier', 'supplier@example.com');

-- Deliveries table
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
);

-- Receipts table
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
);

-- Internal transfers table
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
);

-- Transfer items table
CREATE TABLE IF NOT EXISTS transfer_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transfer_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (transfer_id) REFERENCES internal_transfers(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Inventory adjustments table
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
);