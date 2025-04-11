import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { FoodItem } from './models/food-item.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public cartService: CartService, public auth: AuthService) {}

  getCartCount(): number {
    return this.cartService.getCartItems().reduce((total: number, item: FoodItem) => total + item.quantity, 0);
  }

  logout(): void {
    this.auth.logout();
  }
}
