export interface Order {
  id: number;
  restaurantId: number;
  items: string[];
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';
}
