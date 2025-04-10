import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderMealService {
  private orders: Order[] = [];
  private apiUrl="http://localhost:3000/api/orders";
  constructor(private http:HttpClient){}
  placeOrder(order: Order): Observable<any> {
    order.id = this.orders.length + 1; // Auto-generate ID
    this.orders.push(order);
    return this.http.post(this.apiUrl,order);
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === id));
  }
}
