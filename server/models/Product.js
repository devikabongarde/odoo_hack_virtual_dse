const { pool } = require('../db');

class Product {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, sku, quantity, price } = data;
    const [result] = await pool.execute(
      'INSERT INTO products (name, sku, quantity, price) VALUES (?, ?, ?, ?)',
      [name, sku || null, quantity || 0, price || 0]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, sku, quantity, price } = data;
    await pool.execute(
      'UPDATE products SET name = ?, sku = ?, quantity = ?, price = ? WHERE id = ?',
      [name, sku, quantity, price, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;