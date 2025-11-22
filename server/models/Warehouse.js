const { pool } = require('../db');

class Warehouse {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM warehouses ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM warehouses WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, location } = data;
    const [result] = await pool.execute(
      'INSERT INTO warehouses (name, location) VALUES (?, ?)',
      [name, location || null]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, location } = data;
    await pool.execute(
      'UPDATE warehouses SET name = ?, location = ? WHERE id = ?',
      [name, location, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM warehouses WHERE id = ?', [id]);
  }
}

module.exports = Warehouse;