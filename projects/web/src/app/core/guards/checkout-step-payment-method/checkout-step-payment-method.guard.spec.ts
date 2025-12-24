import { TestBed } from '@angular/core/testing';

import { CheckoutStepPaymentMethodGuard } from './checkout-step-payment-method.guard';

describe('CheckoutStepPaymentMethodGuard', () => {
    let guard: CheckoutStepPaymentMethodGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CheckoutStepPaymentMethodGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
