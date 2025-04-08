import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodItem } from 'src/app/models/food-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

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
}
