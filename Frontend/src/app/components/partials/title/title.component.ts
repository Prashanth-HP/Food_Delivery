import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule // Add CommonModule
  ],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor() { }

  @Input()
  title!: string;

  @Input()
  margin? = '1rem 0 1rem 0.2rem';

  @Input()
  fontSize? = '1.7rem';

  ngOnInit(): void {
  }

}
