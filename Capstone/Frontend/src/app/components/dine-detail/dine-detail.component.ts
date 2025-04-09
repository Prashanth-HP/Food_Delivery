// src/app/components/dine-detail/dine-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { DineDataService } from 'src/app/services/dine-data.service';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-dine-detail',
  templateUrl: './dine-detail.component.html',
  styleUrls: ['./dine-detail.component.css']
})
export class DineDetailComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private dineService: DineDataService) {}

  ngOnInit(): void {
    this.dineService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }
}
