// // cart.component.ts

// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/services/cart.service';
// import { FoodItem } from 'src/app/models/food-item.model';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   items: FoodItem[] = [];
//   resId: number = 0;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.items = this.cartService.getCartItems();
//     this.resId = this.cartService.getResId();
//   }

//   increaseQuantity(item: FoodItem): void {
//     item.quantity++;
//   }

//   decreaseQuantity(item: FoodItem): void {
//     if (item.quantity > 1) {
//       item.quantity--;
//     }
//   }

//   removeItem(item: FoodItem): void {
//     this.cartService.removeFromCart(item);
//     this.items = this.cartService.getCartItems();
//   }

//   getTotalPrice(): number {
//     return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
//   }

//   getCartCount(): number {
//     return this.items.reduce((total, item) => total + item.quantity, 0);
//   }

//   placeOrder(): void {
//     // handle order logic here

//   }
// }

///////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodItem } from 'src/app/models/food-item.model';
import {OrderMealService} from 'src/app/services/order-meal.service';
import {Order} from 'src/app/models/order.model';

import {Restaurant} from 'src/app/models/restaurant.model';
import { DineDataService } from 'src/app/services/dine-data.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: FoodItem[] = [];
  resId: number = -1;
  order!: Order;
  constructor(public cartService: CartService,
              public orderService:OrderMealService,
              private dineDataService: DineDataService,
  ) {}
  ngOnInit() {
    this.items = this.cartService.getCartItems();
    this.resId = this.cartService.getResId();
    this.initOrder();
  }
  initOrder() {
    this.order = {
      restaurant_id: this.resId,
      items: this.items.map(item => item.name),
      total_price: this.cartService.getTotalAmount(),
      delivery_address: " ", // Use a real address
      status: 'Pending',
      created_at: new Date(),
    };
    this.dineDataService.getRestaurantById(this.resId).subscribe(r => this.order.delivery_address = r.location);

  }


  increaseQuantity(item: FoodItem) {
    item.quantity++;
  }

  decreaseQuantity(item: FoodItem) {
    if (item.quantity > 1) item.quantity--;
  }

  removeItem(item: FoodItem) {
    this.cartService.removeFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartService.getCartItems()
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  onclick() {
    console.log("Restaurant ID:", this.resId); // Debug
    console.log("Order:", this.order); // Debug
    this.orderService.placeOrder(this.order).subscribe({
      next: () => console.log('Success!'),
      error: (err) => console.error('Error:', err)
    });
  }
  
}
