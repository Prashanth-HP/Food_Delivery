import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { FoodItem } from './models/food-item.model';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isUserLoggedIn$: Observable<boolean>;
  isDropdownOpen = false; 
  constructor(public cartService: CartService, public auth: AuthService) {
    this.isUserLoggedIn$ = this.auth.isLoggedIn$;
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    // Close dropdown if it's open, useful for clicking outside later
    if (this.isDropdownOpen) {
        this.isDropdownOpen = false;
    }
 }

  getCartCount(): number {
    return this.cartService.getCartItems().reduce((total: number, item: FoodItem) => total + item.quantity, 0);
  }

  logout(): void {
    this.closeDropdown(); // Close dropdown first
    this.auth.logout();
  }
}
