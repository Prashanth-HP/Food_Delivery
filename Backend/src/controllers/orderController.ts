import { Request, Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';

// Define the Order interface
interface Order extends RowDataPacket {
  id: number;
  restaurant_id: number;
  items: string; // JSON string representing the items
  total_price: number;
  delivery_address: string;
  status: string;
  created_at: Date;
}

// Get all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<Order[]>('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<Order[]>('SELECT * FROM orders WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { restaurant_id, items, total_price, delivery_address } = req.body;

  if (!restaurant_id || !items || total_price <= 0 || !delivery_address) {
    res.status(400).json({ error: 'Invalid order data' });
    return;
  }

  try {
    const [result]: any = await pool.query(
      'INSERT INTO orders (restaurant_id, items, total_price, delivery_address, status) VALUES (?, ?, ?, ?, ?)',
      [restaurant_id, JSON.stringify(items), total_price, delivery_address, 'Pending']
    );
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update an order's status (for automatic progression)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status against allowed values
  const allowedStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  if (!status || !allowedStatuses.includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }

  try {
    // First check if order exists
    const [checkRows]: any = await pool.query('SELECT id FROM orders WHERE id = ?', [id]);
    
    if (checkRows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Then update the status
    const [result]: any = await pool.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({ 
      message: 'Order status updated successfully',
      newStatus: status
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Prevent deletion of orders that are "Out for Delivery"
    const [result]: any = await pool.query(
      'DELETE FROM orders WHERE id = ? AND status != "Out for Delivery"',
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: 'Order not found or cannot be deleted because it is already "Out for Delivery"',
      });
      return;
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};