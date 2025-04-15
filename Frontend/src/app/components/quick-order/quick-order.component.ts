import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { quickFoods } from 'src/app/models/restaurant.model';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.css']
})
export class QuickOrderComponent {
  quickFoods = [
    { id:1,name: 'Veggie Burger', type: 'Veg', time: 15,price:500, imageUrl: 'assets/QuickMenu/Veggie Burger.jpg' },
    { id:2,name: 'Chicken Wrap', type: 'Non-Veg', time: 12,price:250, imageUrl: 'assets/QuickMenu/Chicken Wrap.jpg' },
    { id:3,name: 'Paneer Pizza', type: 'Veg', time: 20,price:350, imageUrl: 'assets/QuickMenu/Paneer Pizza.jpg' },
    { id:4,name: 'Fish Fingers', type: 'Non-Veg', time: 10,price:400, imageUrl: 'assets/QuickMenu/Fish Fingers.jpg' }
  ];

  selectedType = '';
  sortOrder = '';

  constructor(private cartService: CartService,private toastr: ToastrService) {

  }

  get filteredFoods() {
    let items = [...this.quickFoods];

    if (this.selectedType) {
      items = items.filter(item => item.type === this.selectedType);
    }

    if (this.sortOrder === 'timeAsc') {
      items.sort((a, b) => a.time - b.time);
    } else if (this.sortOrder === 'timeDesc') {
      items.sort((a, b) => b.time - a.time);
    }

    return items;
  }

  orderNow(item: any) {
    this.cartService.addToCart(item);
    const audio = new Audio('assets/bell.mp3');
  audio.play();
  this.toastr.success(`${item.name} has been added to your cart!`, 'Item Added', {
    timeOut: 2000, 
    closeButton: true, 
    progressBar: true, 
  });

  }
  resetFilters() {
    this.selectedType = '';
    this.sortOrder = '';
  }
}
