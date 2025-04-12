import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DineDetailComponent } from './components/dine-detail/dine-detail.component';
import { QuickOrderComponent } from './components/quick-order/quick-order.component';
import { TrackMyMealComponent } from './components/track-my-meal/track-my-meal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FilterFoodPipe } from './pipes/filter-food.pipe';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    DineDetailComponent,
    QuickOrderComponent,
    TrackMyMealComponent,
    CartComponent,
    RestaurantDetailComponent,
    RestaurantListComponent,
    RestaurantMenuComponent,
    FavoritesComponent,
    FilterFoodPipe,
    HomeComponent,
    LoginComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
