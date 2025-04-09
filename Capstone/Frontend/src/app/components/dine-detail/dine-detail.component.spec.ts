import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DineDetailComponent } from './dine-detail.component';

describe('DineDetailComponent', () => {
  let component: DineDetailComponent;
  let fixture: ComponentFixture<DineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DineDetailComponent]
    });
    fixture = TestBed.createComponent(DineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
