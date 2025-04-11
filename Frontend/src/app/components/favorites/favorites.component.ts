import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CartService } from 'src/app/services/cart.service';
import { MenuItem } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteItems: MenuItem[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.favoriteItems = this.favoriteService.getFavorites();
  }

  orderItem(item: MenuItem): void {
    this.cartService.addToCart(item);
  }
}
