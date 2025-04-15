import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { CartService } from 'src/app/services/cart.service';
import { FoodItem } from 'src/app/models/food-item.model';
import { OrderMealService } from 'src/app/services/order-meal.service';
import { Order } from 'src/app/models/order.model';
import { DineDataService } from 'src/app/services/dine-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: FoodItem[] = [];
  resId: number = -1;
  order!: Order;
  isOrdering: boolean = false;

  constructor(
    public cartService: CartService,
    public orderService: OrderMealService,
    private dineDataService: DineDataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getCartItems();
    this.resId = this.cartService.getResId();
   
    if (this.items.length > 0 && this.resId !== -1) {
      this.initOrder();
    } else if (this.resId === -1 && this.items.length > 0) {
        console.error("Cart has items but no Restaurant ID is set in CartService.");
    }
  }

  initOrder() {
    if (this.resId === -1 || this.items.length === 0) {
        console.error("Cannot initialize order: Invalid resId or empty cart.");
        return;
    }

    this.order = {
      restaurant_id: this.resId,
      items: this.items.map(item => item.name),
      total_price: this.cartService.getTotalAmount(),
      delivery_address: "Loading address...", 
      status: 'Pending',
      created_at: new Date(),
    };

    
    this.dineDataService.getRestaurantById(this.resId).subscribe({
        next: r => {
            if (r) {
                this.order.delivery_address = r.location;
            } else {
                console.error(`Restaurant with ID ${this.resId} not found.`);
                this.order.delivery_address = "Address not found";
            }
        },
        error: err => {
            console.error('Error fetching restaurant details:', err);
            this.order.delivery_address = "Error loading address";
             
        }
    });
  }

  increaseQuantity(item: FoodItem) {
    item.quantity++;
    this.updateOrderDetails(); 
  }

  decreaseQuantity(item: FoodItem) {
    if (item.quantity > 1) {
        item.quantity--;
        this.updateOrderDetails(); 
    } else if (item.quantity === 1) {
        
        this.removeItem(item);
    }
    else if (item.quantity === 0) {
      this.cartService.removeFromCart(item);
      this.items = this.cartService.getCartItems(); 
      this.order = undefined!; 
      this.updateOrderDetails();
  }
  }

  removeItem(item: FoodItem) {
    this.cartService.removeFromCart(item);
    this.items = this.cartService.getCartItems();
    if (this.items.length === 0) {
        this.order = undefined!;
        this.resId = -1; 
    } else {
        this.updateOrderDetails();
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  
  updateOrderDetails() {
      if (this.order) {
          this.order.items = this.items.map(item => item.name);
          this.order.total_price = this.getTotalPrice();
      } else if (this.items.length > 0 && this.resId !== -1) {
          this.initOrder();
      }
  }


  onclick() {
  
    if (!this.order || this.isOrdering || this.items.length === 0) {
        console.warn("Cannot place order: Order data not ready, already ordering, or cart is empty.");
        return;
    }

    this.isOrdering = true; 


    this.updateOrderDetails();
    this.order.created_at = new Date();

    console.log("Placing Order:", this.order); 

    this.orderService.placeOrder(this.order).subscribe({
      next: (response) => { 
        console.log('Order placed successfully!', response);

        
        this.cartService.clearCart();
        this.items = []; 
        this.order = undefined!; 
        this.resId = -1; 

        this.toastr.success(`Thank you for ordering! `, 'Order placed successfully!', {
          timeOut: 2000, 
          closeButton: true,
          progressBar: true, 
        });

        setTimeout(() => {
          this.isOrdering = false; 
          this.router.navigate(['/orders']); 
        }, 3000);
      },
      error: (err) => {
        console.error('Error placing order:', err);
        this.isOrdering = false; 
     
        alert(`Order failed: ${err.message || 'Please try again.'}`);
      }
    });
  }
}
