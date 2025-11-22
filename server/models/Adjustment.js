const { pool } = require('../db');

class Adjustment {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM inventory_adjustments ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM inventory_adjustments WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status = 'Pending' } = data;
    const [result] = await pool.execute(
      'INSERT INTO inventory_adjustments (product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status } = data;
    await pool.execute(
      'UPDATE inventory_adjustments SET product_name = ?, current_quantity = ?, adjusted_quantity = ?, reason = ?, adjustment_date = ?, status = ? WHERE id = ?',
      [product_name, current_quantity, adjusted_quantity, reason, adjustment_date, status, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM inventory_adjustments WHERE id = ?', [id]);
  }
}

module.exports = Adjustment;