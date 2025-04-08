import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DineDetailComponent } from './components/dine-detail/dine-detail.component';
import { QuickOrderComponent } from './components/quick-order/quick-order.component';
import { CartComponent } from './components/cart/cart.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
const routes: Routes = [
  { path: '', redirectTo: 'explore', pathMatch: 'full' },
  { path: 'dine', component: DineDetailComponent },
  { path: 'quick-order', component: QuickOrderComponent },
  { path: '', redirectTo: 'food-explorer', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'menu/:id', component: RestaurantMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
