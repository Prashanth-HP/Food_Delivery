import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders); // GET /api/orders
router.get('/:id', getOrderById); // GET /api/orders/:id
router.post('/', createOrder); // POST /api/orders
router.put('/:id', updateOrderStatus); // PUT /api/orders/:id
router.delete('/:id', deleteOrder); // DELETE /api/orders/:id

export default router;
