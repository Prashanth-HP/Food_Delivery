import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // Keep temporarily if needed, but likely removable
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for animations provider

import { AppComponent } from './app/app.component'; // Import the standalone AppComponent
import { AppRoutingModule } from './app/app-routing.module'; // Import AppRoutingModule for routes provider
// Import environment if you use it
// import { environment } from './environments/environment';

// if (environment.production) { // Uncomment if you have environment files
//   enableProdMode();
// }

// Bootstrap the standalone AppComponent
bootstrapApplication(AppComponent, {
  providers: [
    // Import providers from existing NgModules
    importProvidersFrom(AppRoutingModule),        // Provides routing capabilities
    importProvidersFrom(BrowserAnimationsModule) // Provides animation capabilities (needed for Angular Material)
    // Add other application-wide providers here if necessary
    // e.g., provideHttpClient() if using HttpClient
  ]
})
  .catch(err => console.error(err));

// Remove or comment out the old bootstrap method:
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));