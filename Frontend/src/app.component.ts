import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './app/components/partials/header/header.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterModule,     // <-- ADD for router-outlet
    HeaderComponent,  // <-- ADD for app-header
    // CommonModule   // <-- ADD if needed for directives/pipes in this template
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
