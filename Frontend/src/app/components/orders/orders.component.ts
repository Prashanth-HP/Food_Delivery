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

// orders.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderMealService } from '../../services/order-meal.service';
import { Order } from '../../models/order.model';
import { timer, Subscription, EMPTY, map, concatMap, catchError, tap, filter } from 'rxjs'; // Added filter

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

  private readonly fullStatusSequence: Order['status'][] = [
    'Pending', 'Preparing', 'Out for Delivery', 'Delivered'
  ];
  private readonly STATUS_UPDATE_INTERVAL = 5000; // 30 seconds

  constructor(private orderService: OrderMealService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.clearAllTimers();

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
    this.orders.forEach(order => {
      if (order.id && order.status !== 'Delivered') {
        this.startStatusProgression(order);
      }
    });
  }

  startStatusProgression(order: Order): void {
    // ... (startStatusProgression logic remains the same as previous correct version)
    if (!order.id || this.statusTimers[order.id]) {
        return;
    }
    const initialStatusIndex = this.fullStatusSequence.indexOf(order.status);
    if (initialStatusIndex === -1 || initialStatusIndex >= this.fullStatusSequence.length - 1) {
      return;
    }
    console.log(`Starting timer for Order ID: ${order.id}, Initial Status: ${order.status}`);
    this.statusTimers[order.id] = timer(this.STATUS_UPDATE_INTERVAL, this.STATUS_UPDATE_INTERVAL).pipe(
      map(() => this.orders.find(o => o.id === order.id)),
      // Add filter to stop if order was removed (e.g., by cancellation)
      filter((currentOrder): currentOrder is Order => !!currentOrder),
      concatMap((currentOrder) => {
        if (currentOrder.status === 'Delivered') {
          this.clearTimer(order.id!);
          return EMPTY;
        }
        const currentStatusIndex = this.fullStatusSequence.indexOf(currentOrder.status);
        const nextStatusIndex = currentStatusIndex + 1;
        if (nextStatusIndex >= this.fullStatusSequence.length) {
           console.log(`Order ${currentOrder.id}: Reached end of sequence. Stopping timer.`);
           this.clearTimer(currentOrder.id!);
           return EMPTY;
        }
        const nextStatus = this.fullStatusSequence[nextStatusIndex];
        const previousStatus = currentOrder.status;
        console.log(`Order ${currentOrder.id}: Attempting update from ${previousStatus} to ${nextStatus}`);
        // Optimistic UI Update
        currentOrder.status = nextStatus;
        // Call Backend
        return this.orderService.updateOrderStatus(currentOrder.id!, nextStatus).pipe(
          tap(() => {
             console.log(`Order ${currentOrder.id}: Backend update to ${nextStatus} successful.`);
            if (nextStatus === 'Delivered') {
              this.clearTimer(currentOrder.id!);
            }
          }),
          catchError(err => {
            console.error(`Order ${currentOrder.id}: FAILED to update status to ${nextStatus} in backend:`, err);
            // Rollback Optimistic Update
            const orderInArray = this.orders.find(o => o.id === currentOrder.id);
            if (orderInArray) { // Check if it still exists (wasn't cancelled meanwhile)
                orderInArray.status = previousStatus;
            }
            this.errorMessage = `Failed to update status for order ${currentOrder.id}.`; // Simplified error message
            this.clearTimer(currentOrder.id!);
            return EMPTY;
          })
        );
      })
    ).subscribe({
        error: (err) => {
            console.error(`Critical error in status timer processing for order ${order.id}:`, err);
            this.clearTimer(order.id!);
        },
        complete: () => {
            console.log(`Timer stream completed for order ${order.id}.`);
        }
    });
  }

  // --- NEW METHOD for CANCELLATION ---
  cancelOrder(order: Order): void {
    if (!order.id || order.status === 'Out for Delivery' || order.status === 'Delivered') {
      console.warn(`Cancellation blocked for order ${order.id} due to status: ${order.status}`);
      return; // Should be blocked by disabled button, but check anyway
    }

    // Confirmation dialog
    if (!confirm(`Are you sure you want to cancel Order #${order.id}?`)) {
      return; // User clicked 'Cancel' in the confirmation
    }

    this.errorMessage = ''; // Clear previous errors

    this.orderService.cancelOrder(order.id).subscribe({
      next: () => {
        console.log(`Order ${order.id} cancelled successfully.`);
        // 1. Stop the timer for this order
        this.clearTimer(order.id!);

        // 2. Remove the order from the local array to update the UI
        this.orders = this.orders.filter(o => o.id !== order.id);

        // Optional: Show a success message (e.g., using a toast notification service)
        // alert(`Order ${order.id} has been cancelled.`);
      },
      error: (err) => {
        console.error(`Failed to cancel order ${order.id}:`, err);
        // Check if the error is because the order wasn't found or couldn't be deleted (e.g., status changed just before click)
        if (err.status === 404) {
             this.errorMessage = `Order ${order.id} could not be cancelled. It might have been updated or deleted already. Please refresh.`;
             // Optionally remove from UI if backend says it's gone
             this.orders = this.orders.filter(o => o.id !== order.id);
             this.clearTimer(order.id!);
        } else {
            this.errorMessage = `An error occurred while cancelling order ${order.id}. Please try again.`;
        }
      }
    });
  }


  // --- Helper to parse items if stored as JSON string in DB ---
  // Adjust this based on how your 'items' data is actually structured/stored
  parseOrderItems(itemsData: string | string[]): string[] {
      if (Array.isArray(itemsData)) {
          return itemsData; // Already an array
      }
      try {
        // Assuming itemsData is a JSON string like '["Pizza", "Coke"]'
        const parsed = JSON.parse(itemsData);
        return Array.isArray(parsed) ? parsed : [itemsData]; // Ensure it's an array
      } catch (e) {
        console.error('Failed to parse order items:', itemsData, e);
        // Return the raw string in an array as a fallback
        return [itemsData || 'Error parsing items'];
      }
  }

  private clearTimer(orderId: number): void {
    // ... (clearTimer remains the same)
    if (this.statusTimers[orderId]) {
      console.log(`Clearing timer for Order ID: ${orderId}`);
      this.statusTimers[orderId].unsubscribe();
      delete this.statusTimers[orderId];
    }
  }

  private clearAllTimers(): void {
    // ... (clearAllTimers remains the same)
     console.log('Clearing all existing timers...');
     Object.keys(this.statusTimers).forEach(id => {
        this.clearTimer(Number(id));
     });
  }

  getStatusClass(status: Order['status']): string {
    // ... (getStatusClass remains the same)
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Preparing': return 'status-preparing';
      case 'Out for Delivery': return 'status-out-for-delivery';
      case 'Delivered': return 'status-delivered';
      default: return '';
    }
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }
}