import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterModule, // Add RouterModule
    CommonModule  // Add CommonModule if using *ngIf etc.
  ],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible:boolean = false;
  @Input()
  notFoundMessage:string = "Nothing Found!";
  @Input()
  resetLinkText:string = "Reset";
  @Input()
  resetLinkRoute:string = "/";
  constructor() { }

  ngOnInit(): void {
  }

}
