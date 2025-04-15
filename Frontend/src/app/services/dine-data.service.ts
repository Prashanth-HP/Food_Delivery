import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators'
import { Restaurant } from 'src/app/models/restaurant.model';  

@Injectable({
  providedIn: 'root',
})
export class DineDataService {
  private apiUrl = 'http://localhost:3000/api/restaurants ';  

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
      return this.http.get<Restaurant[]>(this.apiUrl).pipe(
        tap((data) => {
          console.log('Fetched restaurants:', data);  
        })
    );
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant[]>(this.apiUrl).pipe(
      map((restaurants) => restaurants.find((restaurant) => restaurant.id === id)!)
    );
  }
}
