import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM restaurants LIMIT 1');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

export default router;