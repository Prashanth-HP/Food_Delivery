// dine-detail.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dine-detail',
  templateUrl: './dine-detail.component.html',
  styleUrls: ['./dine-detail.component.css']
})
export class DineDetailComponent {
  searchText: string = '';

  restaurants: any[] = [];

  filteredRestaurants() {
    const search = this.searchText.toLowerCase();
    return this.restaurants.filter(r =>
      r.name.toLowerCase().includes(search) ||
      r.cuisine_type.toLowerCase().includes(search)
    );
  }
}
