import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './app/components/partials/header/header.component';
import { HomeComponent } from './app/components/pages/home/home.component';
import { SearchComponent } from './app/components/partials/search/search.component';
import { TagsComponent } from './app/components/partials/tags/tags.component';
import { FoodPageComponent } from './app/components/pages/food-page/food-page.component';
import { CartPageComponent } from './app/components/pages/cart-page/cart-page.component';
import { TitleComponent } from './app/components/partials/title/title.component';
import { NotFoundComponent } from './app/components/partials/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommonModule,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    //StarRatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }