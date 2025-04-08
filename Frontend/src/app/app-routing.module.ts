// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import the components used in the routes
import { CartPageComponent } from './components/pages/cart-page/cart-page.component'; // Adjust path if needed
import { FoodPageComponent } from './components/pages/food-page/food-page.component'; // Adjust path if needed
import { HomeComponent } from './components/pages/home/home.component';       // Adjust path if needed

// --- RESTORE YOUR ROUTES HERE ---
const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route displays HomeComponent
  { path: 'search/:searchTerm', component: HomeComponent }, // Search route
  { path: 'tag/:tag', component: HomeComponent },         // Tag route
  { path: 'food/:id', component: FoodPageComponent },     // Food details route
  { path: 'cart-page', component: CartPageComponent }     // Cart route
];
// --- END OF ROUTES ---

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use the restored routes
  exports: [RouterModule]
})
export class AppRoutingModule { }