import { TestBed } from '@angular/core/testing';

import { CheckoutStepAddressGuard } from './checkout-step-address.guard';

describe('CheckoutStepAddressGuard', () => {
    let guard: CheckoutStepAddressGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CheckoutStepAddressGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
