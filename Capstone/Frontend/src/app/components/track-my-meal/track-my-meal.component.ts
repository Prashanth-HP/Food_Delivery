import { Component } from '@angular/core';
import { Order, OrderStatus } from 'src/app/models/order-status.model';

@Component({
  selector: 'app-track-my-meal',
  templateUrl: './track-my-meal.component.html',
  styleUrls: ['./track-my-meal.component.css']
})
export class TrackMyMealComponent {

  order = {
    id: 1,
    items: [],
    status: 'Preparing', // Current order status
    restaurantId: 123,
    totalAmount: 299
  };

  orderStatuses: string[] = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
}
