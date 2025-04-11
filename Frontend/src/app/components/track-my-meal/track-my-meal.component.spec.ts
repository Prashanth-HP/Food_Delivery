import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyMealComponent } from './track-my-meal.component';

describe('TrackMyMealComponent', () => {
  let component: TrackMyMealComponent;
  let fixture: ComponentFixture<TrackMyMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackMyMealComponent]
    });
    fixture = TestBed.createComponent(TrackMyMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
