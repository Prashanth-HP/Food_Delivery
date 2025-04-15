import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  showMenu = false;
  constructor(
    private dineDataService: DineDataService,private route: ActivatedRoute) {}

    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
      console.log('Restaurant ID:', id);
      this.dineDataService.getRestaurantById(id).subscribe(
        (data) => {
          console.log('Restaurant data:', data);
          this.restaurant = data;
        });
    }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
