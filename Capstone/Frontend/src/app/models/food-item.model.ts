export interface FoodItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;   // ✅ use 'category' to describe Veg/Non-Veg
  quantity: number;
}
