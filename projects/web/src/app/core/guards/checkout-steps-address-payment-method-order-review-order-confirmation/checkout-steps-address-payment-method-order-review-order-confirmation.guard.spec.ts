import { TestBed } from '@angular/core/testing';

import { CheckoutStepsAddressPaymentMethodOrderReviewOrderConfirmationGuard } from './checkout-steps-address-payment-method-order-review-order-confirmation.guard';

describe('CheckoutStepsAddressPaymentMethodOrderReviewOrderConfirmationGuard', () => {
  let guard: CheckoutStepsAddressPaymentMethodOrderReviewOrderConfirmationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckoutStepsAddressPaymentMethodOrderReviewOrderConfirmationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
