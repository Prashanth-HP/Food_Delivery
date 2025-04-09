import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderMealService {
  private orders: Order[] = [];

  placeOrder(order: Order): Observable<Order> {
    order.id = this.orders.length + 1; // Auto-generate ID
    this.orders.push(order);
    return of(order);
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === id));
  }
}
