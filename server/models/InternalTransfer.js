const { pool } = require('../db');

class InternalTransfer {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM internal_transfers ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM internal_transfers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { transfer_id, source_location, destination_location, transfer_date, status = 'Draft', total_items = 0 } = data;
    const [result] = await pool.execute(
      'INSERT INTO internal_transfers (transfer_id, source_location, destination_location, transfer_date, status, total_items) VALUES (?, ?, ?, ?, ?, ?)',
      [transfer_id, source_location, destination_location, transfer_date, status, total_items]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { transfer_id, source_location, destination_location, transfer_date, status, total_items } = data;
    await pool.execute(
      'UPDATE internal_transfers SET transfer_id = ?, source_location = ?, destination_location = ?, transfer_date = ?, status = ?, total_items = ? WHERE id = ?',
      [transfer_id, source_location, destination_location, transfer_date, status, total_items, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM internal_transfers WHERE id = ?', [id]);
  }
}

module.exports = InternalTransfer;