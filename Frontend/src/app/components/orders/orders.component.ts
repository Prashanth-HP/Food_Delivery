// import { Component, OnInit } from '@angular/core';
// import { OrderMealService } from '../../services/order-meal.service';
// import { Order } from '../../models/order.model';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
// })
// export class OrdersComponent implements OnInit {
//   orders: Order[] = [];
//   isLoading = true;
//   errorMessage = '';

//   constructor(private orderService: OrderMealService) {}

//   ngOnInit(): void {
//     this.loadOrders();
//   }

//   loadOrders(): void {
//     this.isLoading = true;
//     this.orderService.getOrderss().subscribe({
//       next: (orders) => {
//         this.orders = orders;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.errorMessage = 'Failed to load orders. Please try again later.';
//         this.isLoading = false;
//         console.error('Error fetching orders:', err);
//       }
//     });

//   }

//   getStatusClass(status: string): string {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return 'status-pending';
//       case 'completed':
//         return 'status-completed';
//       case 'cancelled':
//         return 'status-cancelled';
//       default:
//         return '';
//     }
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderMealService } from '../../services/order-meal.service';
import { Order } from '../../models/order.model';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  isLoading = true;
  errorMessage = '';
  statusTimers: { [key: number]: Subscription } = {};

  // Define the status progression sequence
  private readonly statusSequence: Order['status'][] = [
    'Preparing',
    'Out for Delivery',
    'Delivered'
  ];

  constructor(private orderService: OrderMealService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrderss().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.initializeStatusTimers();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching orders:', err);
      }
    });
  }

  initializeStatusTimers(): void {
    // Clear all existing timers
    Object.values(this.statusTimers).forEach(timer => timer.unsubscribe());
    this.statusTimers = {};

    // Start timers for each non-completed order
    this.orders.forEach(order => {
      if (order.id && order.status !== 'Delivered') {
        this.startStatusProgression(order);
      }
    });
  }

  startStatusProgression(order: Order): void {
    if (!order.id || order.status === 'Delivered') return;

    const currentStatusIndex = order.status === 'Pending' 
      ? -1 
      : this.statusSequence.indexOf(order.status);

    if (currentStatusIndex >= this.statusSequence.length - 1) return;

    this.statusTimers[order.id] = interval(30000).pipe(
      switchMap(() => {
        const nextStatus = this.statusSequence[currentStatusIndex + 1];
        order.status = nextStatus;
        return this.orderService.updateOrderStatus(order.id!, nextStatus);
      })
    ).subscribe({
      next: () => {
        if (order.id) {
          const newIndex = this.statusSequence.indexOf(order.status);
          if (newIndex >= this.statusSequence.length - 1) {
            this.clearTimer(order.id);
          }
        }
      },
      error: (err) => {
        console.error(`Failed to update status for order ${order.id}:`, err);
      }
    });
  }

  private clearTimer(orderId: number): void {
    this.statusTimers[orderId]?.unsubscribe();
    delete this.statusTimers[orderId];
  }

  getStatusClass(status: Order['status']): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Preparing':
        return 'status-preparing';
      case 'Out for Delivery':
        return 'status-out-for-delivery';
      case 'Delivered':
        return 'status-delivered';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    // Clean up all timers when component is destroyed
    Object.values(this.statusTimers).forEach(timer => timer.unsubscribe());
  }
}
