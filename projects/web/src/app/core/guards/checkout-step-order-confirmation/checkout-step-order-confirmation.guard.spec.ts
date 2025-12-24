import { TestBed } from '@angular/core/testing';

import { CheckoutStepOrderConfirmationGuard } from './checkout-step-order-confirmation.guard';

describe('CheckoutStepOrderConfirmationGuard', () => {
    let guard: CheckoutStepOrderConfirmationGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CheckoutStepOrderConfirmationGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
