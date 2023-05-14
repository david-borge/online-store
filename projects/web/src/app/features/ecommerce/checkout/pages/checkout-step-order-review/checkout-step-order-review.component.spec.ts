import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepOrderReviewComponent } from './checkout-step-order-review.component';

describe('CheckoutStepOrderReviewComponent', () => {
  let component: CheckoutStepOrderReviewComponent;
  let fixture: ComponentFixture<CheckoutStepOrderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepOrderReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutStepOrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
