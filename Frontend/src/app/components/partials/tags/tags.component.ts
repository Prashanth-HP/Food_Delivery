import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  restaurantTags: string[] = [
    'Indian Accent', 'Bukhara', 'The Bombay Canteen', 'Wasabi by Morimoto',
    'Karavalli', 'Peshawri', 'Dum Pukht', 'Villa Maya', 'The Table', 'Masque'
  ];

  restaurantFoods = [
    {
      name: 'Indian Accent',
      foods: [
        {
          name: 'Dal Makhani Tacos',
          image: 'assets/Dal Makhani Tacos.jpg',
          time: '30 mins',
          type: 'Veg - Main Course'
        },
        {
          name: 'Blue Cheese Naan',
          image: 'assets/Blue Cheese Naan.jpg',
          time: '20 mins',
          type: 'Veg - Starter'
        }
      ]
    },
    {
      name: 'Bukhara',
      foods: [
        {
          name: 'Dal Bukhara',
          image: 'assets/Dal Bukhara.jpg',
          time: '40 mins',
          type: 'Veg - Main Course'
        },
        {
          name: 'Sikandari Raan',
          image: 'assets/Sikandari Raan.jpg',
          time: '1 hr',
          type: 'Non-Veg - Main Course'
        }
      ]
    },
    {
      name: 'The Bombay Canteen',
      foods: [
        {
          name: 'Keema Pao',
          image: 'assets/Keema Pao.jpg',
          time: '35 mins',
          type: 'Non-Veg - Main Course'
        },
        {
          name: 'Eggs Kejriwal',
          image: 'assets/Eggs Kejriwal.jpg',
          time: '15 mins',
          type: 'Egg - Breakfast'
        }
      ]
    },
    {
      name: 'Wasabi by Morimoto',
      foods: [
        {
          name: 'Black Cod Miso',
          image: 'assets/Black Cod Miso.jpg',
          time: '45 mins',
          type: 'Seafood - Main Course'
        },
        {
          name: 'Sushi Platter',
          image: 'assets/Sushi Platter.jpg',
          time: '25 mins',
          type: 'Seafood - Appetizer'
        }
      ]
    },
    {
      name: 'Karavalli',
      foods: [
        {
          name: 'Meen Pollichathu',
          image: 'assets/Meen Pollichathu.jpg',
          time: '35 mins',
          type: 'Seafood - Main Course'
        },
        {
          name: 'Appam with Stew',
          image: 'assets/Appam with Stew.jpg',
          time: '30 mins',
          type: 'Veg - Breakfast'
        }
      ]
    },
    {
      name: 'Peshawri',
      foods: [
        {
          name: 'Barrah Kebab',
          image: 'assets/Barrah Kebab.jpg',
          time: '40 mins',
          type: 'Non-Veg - Starter'
        },
        {
          name: 'Murgh Malai Tikka',
          image: 'assets/Murgh Malai Tikka.jpg',
          time: '30 mins',
          type: 'Non-Veg - Main Course'
        }
      ]
    },
    {
      name: 'Dum Pukht',
      foods: [
        {
          name: 'Dum Pukht Biryani',
          image: 'assets/Dum Pukht Biryani.jpg',
          time: '50 mins',
          type: 'Non-Veg - Main Course'
        },
        {
          name: 'Shahi Nihari',
          image: 'assets/Shahi Nihari.jpg',
          time: '1 hr',
          type: 'Non-Veg - Gravy'
        }
      ]
    },
    {
      name: 'Villa Maya',
      foods: [
        {
          name: 'Kerala Prawn Curry',
          image: 'assets/Kerala Prawn Curry.jpg',
          time: '40 mins',
          type: 'Seafood - Gravy'
        },
        {
          name: 'Tender Coconut Payasam',
          image: 'assets/Tender Coconut Payasam.jpg',
          time: '20 mins',
          type: 'Dessert'
        }
      ]
    },
    {
      name: 'The Table',
      foods: [
        {
          name: 'Zucchini Spaghetti',
          image: 'assets/Zucchini Spaghetti.jpg',
          time: '25 mins',
          type: 'Veg - Main Course'
        },
        {
          name: 'Truffle Fries',
          image: 'assets/Truffle Fries.jpg',
          time: '15 mins',
          type: 'Veg - Snack'
        }
      ]
    },
    {
      name: 'Masque',
      foods: [
        {
          name: 'Jackfruit Tacos',
          image: 'assets/Jackfruit Tacos.jpg',
          time: '30 mins',
          type: 'Veg - Fusion'
        },
        {
          name: 'Goat Curry with Millet Roti',
          image: 'assets/Goat Curry with Millet Roti.jpg',
          time: '45 mins',
          type: 'Non-Veg - Traditional'
        }
      ]
    }
  ];

  selectedFoods: {
    name: string;
    image: string;
    time: string;
    type: string;
  }[] = [];

  constructor() {}

  ngOnInit(): void {}

  onRestaurantClick(restaurant: string): void {
    const selected = this.restaurantFoods.find(r => r.name === restaurant);
    this.selectedFoods = selected ? selected.foods : [];
  }
}
