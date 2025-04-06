import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Comment out
import { FoodService } from 'src/app/services/food.service'; // Comment out
import { Food } from 'src/app/shared/models/Food';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { StarRatingComponent } from '../../partials/star-rating/star-rating.component'; // Import if needed later

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    CommonModule,
    SearchComponent,
    TagsComponent, 
    NotFoundComponent, 
    RouterModule,
    // StarRatingComponent // Add if needed later
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    console.log("HomeComponent Constructor Called"); 
    
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      else
        this.foods = foodService.getAll();
    })
    
   
   this.foods = [];
  }

  ngOnInit(): void {
    console.log("HomeComponent ngOnInit Called"); // Add a simple log
  }
}