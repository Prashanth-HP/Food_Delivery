import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getOrders); 
router.get('/:id', getOrderById); 
router.post('/', createOrder); 
router.put('/:id', updateOrderStatus); 
router.delete('/:id', deleteOrder); 

export default router;
