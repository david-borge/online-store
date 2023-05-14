import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepOrderConfirmationComponent } from './checkout-step-order-confirmation.component';

describe('CheckoutStepOrderConfirmationComponent', () => {
  let component: CheckoutStepOrderConfirmationComponent;
  let fixture: ComponentFixture<CheckoutStepOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepOrderConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutStepOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
