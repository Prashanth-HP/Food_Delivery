import { TestBed } from '@angular/core/testing';

import { OrderMealService } from './order-meal.service';

describe('OrderMealService', () => {
  let service: OrderMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
