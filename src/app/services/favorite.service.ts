import { Injectable } from '@angular/core';
import { MenuItem } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: MenuItem[] = [];

  addToFavorites(item: MenuItem): void {
    if (!this.favorites.find(fav => fav.id === item.id)) {
      this.favorites.push(item);
    }
  }

  removeFromFavorites(itemId: string): void {
    this.favorites = this.favorites.filter(item => item.id !== itemId);
  }

  getFavorites(): MenuItem[] {
    return this.favorites;
  }

  isFavorite(item: MenuItem): boolean {
    return this.favorites.some(fav => fav.id === item.id);
  }
}
