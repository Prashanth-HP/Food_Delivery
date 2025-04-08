import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  imports: [
    RouterModule,
    HeaderComponent,
    //CommonModule,
    // other imports like CommonModule might also be needed eventually
  ],
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
}
