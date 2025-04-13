import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators'
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
  getOrderss(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl).pipe(
          tap((data) => {
            console.log('Fetched orders:', data);  // Add this line
          })
      );
    }

  getOrderById(id: number): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === id));
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}`, { status });
  }

  cancelOrder(orderId: number): Observable<any> {
    // Uses the existing DELETE endpoint which has the necessary status checks
    return this.http.delete(`${this.apiUrl}/${orderId}`);
  }
}
