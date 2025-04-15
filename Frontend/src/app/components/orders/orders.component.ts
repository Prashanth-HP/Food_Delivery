import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderMealService } from '../../services/order-meal.service';
import { Order } from '../../models/order.model';
import { timer, Subscription, EMPTY, map, concatMap, catchError, tap, filter } from 'rxjs'; 

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
  private readonly STATUS_UPDATE_INTERVAL = 5000; 

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

        currentOrder.status = nextStatus;

        return this.orderService.updateOrderStatus(currentOrder.id!, nextStatus).pipe(
          tap(() => {
             console.log(`Order ${currentOrder.id}: Backend update to ${nextStatus} successful.`);
            if (nextStatus === 'Delivered') {
              this.clearTimer(currentOrder.id!);
            }
          }),
          catchError(err => {
            console.error(`Order ${currentOrder.id}: FAILED to update status to ${nextStatus} in backend:`, err);

            const orderInArray = this.orders.find(o => o.id === currentOrder.id);
            if (orderInArray) { 
                orderInArray.status = previousStatus;
            }
            this.errorMessage = `Failed to update status for order ${currentOrder.id}.`; 
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

  cancelOrder(order: Order): void {
    if (!order.id || order.status === 'Out for Delivery' || order.status === 'Delivered') {
      console.warn(`Cancellation blocked for order ${order.id} due to status: ${order.status}`);
      return; 
    }

    if (!confirm(`Are you sure you want to cancel Order #${order.id}?`)) {
      return; 
    }

    this.errorMessage = ''; 

    this.orderService.cancelOrder(order.id).subscribe({
      next: () => {
        console.log(`Order ${order.id} cancelled successfully.`);

        this.clearTimer(order.id!);

        this.orders = this.orders.filter(o => o.id !== order.id);

      },
      error: (err) => {
        console.error(`Failed to cancel order ${order.id}:`, err);

        if (err.status === 404) {
             this.errorMessage = `Order ${order.id} could not be cancelled. It might have been updated or deleted already. Please refresh.`;

             this.orders = this.orders.filter(o => o.id !== order.id);
             this.clearTimer(order.id!);
        } else {
            this.errorMessage = `An error occurred while cancelling order ${order.id}. Please try again.`;
        }
      }
    });
  }

  parseOrderItems(itemsData: string | string[]): string[] {
      if (Array.isArray(itemsData)) {
          return itemsData; 
      }
      try {

        const parsed = JSON.parse(itemsData);
        return Array.isArray(parsed) ? parsed : [itemsData]; 
      } catch (e) {
        console.error('Failed to parse order items:', itemsData, e);

        return [itemsData || 'Error parsing items'];
      }
  }

  private clearTimer(orderId: number): void {

    if (this.statusTimers[orderId]) {
      console.log(`Clearing timer for Order ID: ${orderId}`);
      this.statusTimers[orderId].unsubscribe();
      delete this.statusTimers[orderId];
    }
  }

  private clearAllTimers(): void {

     console.log('Clearing all existing timers...');
     Object.keys(this.statusTimers).forEach(id => {
        this.clearTimer(Number(id));
     });
  }

  getStatusClass(status: Order['status']): string {

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
