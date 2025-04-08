import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant, MenuItem } from 'src/app/models/restaurant.model';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  restaurant: Restaurant | undefined;
  menuItems: MenuItem[] = [];
  searchTerm: string = '';
  filterType: string = 'All';

  constructor(
    private route: ActivatedRoute,
    private dineService: DineDataService,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dineService.getRestaurants().subscribe((restaurants) => {
      this.restaurant = restaurants.find((r) => r.id === id);
      this.menuItems = this.restaurant?.menu ?? [];
      this.menuItems.forEach(item => {
        item.isFavorite = this.favoriteService.isFavorite(item);
      });
    });
  }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
  }

  toggleFavorite(item: MenuItem) {
    item.isFavorite = !item.isFavorite;
    if (item.isFavorite) {
      this.favoriteService.addToFavorites(item);
    } else {
      this.favoriteService.removeFromFavorites(item.id);
    }
  }
}
