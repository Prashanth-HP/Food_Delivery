import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/restaurant.model';

@Pipe({
  name: 'filterFood'
})
export class FilterFoodPipe implements PipeTransform {
  transform(items: MenuItem[], searchTerm: string, filterType: string): MenuItem[] {
    if (!items) return [];
    return items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'All' || (filterType === 'Veg' && item.isVeg) || (filterType === 'Non-Veg' && !item.isVeg);
      return matchSearch && matchType;
    });
  }
}
