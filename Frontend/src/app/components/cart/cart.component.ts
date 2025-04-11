// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodItem } from 'src/app/models/food-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: FoodItem[] = [];
  resId: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
    this.resId = this.cartService.getResId();
  }

  increaseQuantity(item: FoodItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: FoodItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: FoodItem): void {
    this.cartService.removeFromCart(item);
    this.items = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  placeOrder(): void {
    // handle order logic here
  }
}
