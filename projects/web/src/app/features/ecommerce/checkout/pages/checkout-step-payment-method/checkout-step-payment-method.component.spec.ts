import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepPaymentMethodComponent } from './checkout-step-payment-method.component';

describe('CheckoutStepPaymentMethodComponent', () => {
  let component: CheckoutStepPaymentMethodComponent;
  let fixture: ComponentFixture<CheckoutStepPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepPaymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutStepPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
