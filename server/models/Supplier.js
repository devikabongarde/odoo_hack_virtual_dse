const { pool } = require('../db');

class Supplier {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM suppliers ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM suppliers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, contact } = data;
    const [result] = await pool.execute(
      'INSERT INTO suppliers (name, contact) VALUES (?, ?)',
      [name, contact || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, contact } = data;
    await pool.execute(
      'UPDATE suppliers SET name = ?, contact = ? WHERE id = ?',
      [name, contact, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM suppliers WHERE id = ?', [id]);
  }
}

module.exports = Supplier;