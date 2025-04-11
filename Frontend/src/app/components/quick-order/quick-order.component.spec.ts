import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderComponent } from './quick-order.component';


describe('QuickOrderComponent', () => {
  let component: QuickOrderComponent;
  let fixture: ComponentFixture<QuickOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickOrderComponent]
    });
    fixture = TestBed.createComponent(QuickOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
