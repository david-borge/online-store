import { TestBed } from '@angular/core/testing';

import { CheckoutStepOrderReviewGuard } from './checkout-step-order-review.guard';

describe('CheckoutStepOrderReviewGuard', () => {
    let guard: CheckoutStepOrderReviewGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CheckoutStepOrderReviewGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
