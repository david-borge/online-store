import { TestBed } from '@angular/core/testing';

import { CheckoutStepSignupLoginGuard } from './checkout-step-signup-login.guard';

describe('CheckoutStepSignupLoginGuard', () => {
    let guard: CheckoutStepSignupLoginGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CheckoutStepSignupLoginGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
