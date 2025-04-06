// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTooltipModule } from '@angular/material/tooltip';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './components/partials/header/header.component';
// import { HomeComponent } from './components/pages/home/home.component';
// import { SearchComponent } from './components/partials/search/search.component';
// import { TagsComponent } from './components/partials/tags/tags.component';
// import { FoodPageComponent } from './components/pages/food-page/food-page.component';
// import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
// import { TitleComponent } from './components/partials/title/title.component';
// import { NotFoundComponent } from './components/partials/not-found/not-found.component';
// import { RouterModule } from '@angular/router';
// import { CurrencyPipe } from '@angular/common';
// import { Food } from './shared/models/Food';

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     HomeComponent,
//     SearchComponent,
//     TagsComponent,
//     FoodPageComponent,
//     CartPageComponent,
//     TitleComponent,
//     NotFoundComponent,
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     CommonModule, // Required for common directives like *ngIf, *ngFor
//     MatIconModule, // Angular Material modules
//     MatButtonModule,
//     RouterModule.forRoot([]),
//     MatTooltipModule,
//     TitleComponent,
//     NotFoundComponent,
//     CartPageComponent,
//     FoodPageComponent,
//     TagsComponent,
//     SearchComponent,
//     HomeComponent,
//     AppComponent,

//   ],
//   providers: [
//     CurrencyPipe,
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; // Keep for AppModule's potential needs & base directives/pipes
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// Routing Module - This should handle RouterModule.forRoot()
import { AppRoutingModule } from './app-routing.module';

// Import the root component (because it's bootstrapped and standalone)
import { AppComponent } from './app.component';

// Import non-standalone components IF HeaderComponent is NOT standalone
// import { HeaderComponent } from './components/partials/header/header.component';

// No need to import other standalone components here unless AppModule itself uses them in a template (unlikely)
// or provides specific configuration for them (less common).

@NgModule({
  // --- Declarations ---
  // Only declare components, directives, or pipes that BELONG to THIS module and are NOT standalone.
  // If HeaderComponent is NOT standalone, declare it here. Otherwise, leave this empty or remove it.
  declarations: [
    // HeaderComponent, // Uncomment this line ONLY if HeaderComponent is NOT standalone
  ],

  // --- Imports ---
  // Import other NgModules your AppModule depends on.
  // Import standalone components ONLY IF they are bootstrapped by this module (like AppComponent).
  imports: [
    BrowserModule,           // Required for browser applications, should only be in AppModule
    BrowserAnimationsModule, // Required for Angular Material animations
    AppRoutingModule,        // Your module that sets up routes with RouterModule.forRoot()
    CommonModule,            // Provides common directives (*ngIf, *ngFor) and pipes (date, currency...)
    MatIconModule,           // Angular Material modules used globally or by AppComponent/HeaderComponent?
    MatButtonModule,
    MatTooltipModule,
    AppComponent,            // Import AppComponent because it's standalone AND listed in 'bootstrap'
    // HeaderComponent,      // Import HeaderComponent if it IS standalone AND used by AppComponent's template
                               // (Assuming AppComponent imports HeaderComponent directly if standalone)
  ],

  // --- Providers ---
  // Register global services here. Do NOT add built-in pipes like CurrencyPipe.
  providers: [
    // Add your application-wide services here, e.g., FoodService, CartService
    // CurrencyPipe, // REMOVED - Provided by CommonModule
  ],

  // --- Bootstrap ---
  // The root component Angular should bootstrap for the application.
  bootstrap: [AppComponent]
})
export class AppModule { }