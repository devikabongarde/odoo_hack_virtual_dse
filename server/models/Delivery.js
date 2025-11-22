const { pool } = require('../db');

class Delivery {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM deliveries ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM deliveries WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { reference, from_location, to_location, contact, schedule_date, status = 'Ready' } = data;
    const [result] = await pool.execute(
      'INSERT INTO deliveries (reference, from_location, to_location, contact, schedule_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [reference, from_location, to_location, contact, schedule_date, status]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { reference, from_location, to_location, contact, schedule_date, status } = data;
    await pool.execute(
      'UPDATE deliveries SET reference = ?, from_location = ?, to_location = ?, contact = ?, schedule_date = ?, status = ? WHERE id = ?',
      [reference, from_location, to_location, contact, schedule_date, status, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM deliveries WHERE id = ?', [id]);
  }
}

module.exports = Delivery;