export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: number;
  restaurantId: number;
  items: any[];
  totalAmount: number;
  status: OrderStatus;
}
