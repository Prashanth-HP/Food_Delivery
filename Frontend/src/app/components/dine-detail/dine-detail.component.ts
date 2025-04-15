import { Component, OnInit } from '@angular/core';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-dine-detail',
  templateUrl: './dine-detail.component.html',
  styleUrls: ['./dine-detail.component.css']
})
export class DineDetailComponent implements OnInit {
  searchText: string = '';
  selectedLocation: string = '';
  selectedCuisine: string = '';
  selectedTime: string = '';

  restaurants: Restaurant[] = [];

  constructor(private dineService: DineDataService) {}

  ngOnInit(): void {
    this.dineService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  get uniqueLocations(): string[] {
    return [...new Set(this.restaurants.map(r => r.location))];
  }

  get uniqueCuisines(): string[] {
    return [...new Set(this.restaurants.map(r => r.cuisine_type))];
  }

  get uniqueTimes(): string[] {
    return ['Breakfast', 'Lunch', 'Dinner'];
  }
  resetFilters() {
    this.searchText = '';
    this.selectedLocation = '';
    this.selectedCuisine = '';
  }
  filteredRestaurants() {
    return this.restaurants.filter(r =>
      (!this.searchText || r.name.toLowerCase().includes(this.searchText.toLowerCase())) &&
      (!this.selectedLocation || r.location === this.selectedLocation) &&
      (!this.selectedCuisine || r.cuisine_type === this.selectedCuisine)
    );
  }
}
