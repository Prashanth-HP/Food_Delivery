import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: FoodItem[] = [];

  // ✅ Add item to cart
  addToCart(item: any) {
    const existing = this.items.find(cartItem  => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  // ✅ Get all items
  getCartItems(): FoodItem[] {
    return this.items;
  }

  // ✅ Remove an item completely
  removeFromCart(item: FoodItem) {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  // ✅ Update quantity manually
  updateQuantity(item: FoodItem, quantity: number) {
    const target = this.items.find(i => i.id === item.id);
    if (target) target.quantity = quantity;
  }

  // ✅ Clear cart
  clearCart() {
    this.items = [];
  }

  // ✅ Total with quantity
  getTotalAmount(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
