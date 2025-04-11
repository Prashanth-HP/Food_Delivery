import { FoodItem } from './food-item.model';
export interface Order {
  id?: number;
  restaurant_id: number;
  items: string[];
  total_price: number;
  delivery_address: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  created_at: Date;
}