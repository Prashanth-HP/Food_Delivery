import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: FoodItem[] = [];
  private restaurant_id: number=-1;

  addToCart(item: any) {
    if (this.items.length === 0) {
      this.restaurant_id = item.restaurant_id;
      console.log("resid"+this.restaurant_id)
    }
    const existing = this.items.find(cartItem  => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    console.log("Done adding");

  }

  getCartItems(): FoodItem[] {
    return this.items;
  }
  getResId():number {
    return this.restaurant_id;
  }

  removeFromCart(item: FoodItem) {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  updateQuantity(item: FoodItem, quantity: number) {
    const target = this.items.find(i => i.id === item.id);
    if (target) target.quantity = quantity;
  }

  clearCart() {
    this.items = [];
  }

  getTotalAmount(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
