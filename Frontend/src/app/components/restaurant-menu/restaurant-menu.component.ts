import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant, MenuItem } from 'src/app/models/restaurant.model';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; 

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
  private apiUrl = "../../../assets/restaurant.json";  
  constructor(
    private route: ActivatedRoute,
    private dineService: DineDataService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getRestaurantss().subscribe((restaurants) => {
      this.restaurant = restaurants.find((r) => r.id === id);
      this.menuItems = this.restaurant?.menu ?? [];
      console.log(this.menuItems);
      this.menuItems.forEach(item => {
        item.isFavorite = this.favoriteService.isFavorite(item);
      });
    });
  }

   getRestaurantss(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.apiUrl).pipe(
          tap((data) => {
            console.log('Fetched restaurants:', data);  
          })
      );
    }

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
    const audio = new Audio('assets/bell.mp3');
  audio.play();
  this.toastr.success(`${item.name} has been added to your cart!`, 'Item Added', {
    timeOut: 2000, 
    closeButton: true, 
    progressBar: true, 
  });
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
