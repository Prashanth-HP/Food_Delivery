export interface MenuItem {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  cookTime: string;
  imageUrl: string;
  description?: string;
  isFavorite?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine_type: string;
  location: string;
  rating: number;
  imageUrl: string;
  menu: MenuItem[];
}

export interface quickFoods {
  id: number,
  name: string;
  type?: boolean;
  price: number;
  time: number;
  imageurl: string;
  description?: string;
}
