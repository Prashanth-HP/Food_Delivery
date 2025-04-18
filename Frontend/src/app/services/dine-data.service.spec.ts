// src/app/services/dine-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class DineDataService {
  private dataUrl = 'http://localhost:3000/api/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.dataUrl);
  }
}
