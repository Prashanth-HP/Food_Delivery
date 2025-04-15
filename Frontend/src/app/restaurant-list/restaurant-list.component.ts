import { Component, OnInit } from '@angular/core';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private dineDataService: DineDataService) {}

  ngOnInit(): void {
    this.dineDataService.getRestaurants().subscribe((data) => {
        this.restaurants = data;
        console.log('Restaurants loaded:', this.restaurants);

      });
  }
}
