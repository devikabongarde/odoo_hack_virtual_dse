const { pool } = require('../db');

class Order {
  static async findAll() {
    const [orderRows] = await pool.execute('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = [];
    for (const order of orderRows) {
      const [itemRows] = await pool.execute(`
        SELECT oi.*, p.name as product_name, p.sku
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      order.items = itemRows.map(item => ({
        product_id: { id: item.product_id, name: item.product_name, sku: item.sku },
        quantity: item.quantity,
        price: item.price
      }));
      orders.push(order);
    }
    return orders;
  }

  static async findById(id) {
    const [orderRows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
    if (orderRows.length === 0) return null;

    const order = orderRows[0];
    const [itemRows] = await pool.execute(`
      SELECT oi.*, p.name as product_name, p.sku
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id]);
    order.items = itemRows.map(item => ({
      product_id: { id: item.product_id, name: item.product_name, sku: item.sku },
      quantity: item.quantity,
      price: item.price
    }));
    return order;
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const { customer, status = 'draft', items = [] } = data;

      // Insert order
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (customer, status) VALUES (?, ?)',
        [customer, status]
      );
      const orderId = orderResult.insertId;

      // Insert items and update product quantities
      for (const item of items) {
        const [productRows] = await connection.execute('SELECT * FROM products WHERE id = ?', [item.product_id]);
        if (productRows.length === 0) throw new Error('Product not found');
        const product = productRows[0];
        const price = item.price != null ? item.price : product.price;

        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity || 1, price]
        );

        // Update product quantity
        await connection.execute(
          'UPDATE products SET quantity = quantity - ? WHERE id = ?',
          [item.quantity || 1, item.product_id]
        );
      }

      await connection.commit();
      return orderId;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const { customer, status } = data;
    await pool.execute(
      'UPDATE orders SET customer = ?, status = ? WHERE id = ?',
      [customer, status, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
  }
}

module.exports = Order;