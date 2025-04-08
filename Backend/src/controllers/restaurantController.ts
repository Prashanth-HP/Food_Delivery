import { Request, Response } from 'express';
import pool from '../config/db.js';
import { RowDataPacket } from 'mysql2';

interface Restaurant extends RowDataPacket {
  id: number;
  name: string;
  location: string;
  cuisine_type: string;
  created_at: Date;
}

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<Restaurant[]>('SELECT * FROM restaurants');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<Restaurant[]>(
      'SELECT * FROM restaurants WHERE id = ?', 
      [id]
    );
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
};