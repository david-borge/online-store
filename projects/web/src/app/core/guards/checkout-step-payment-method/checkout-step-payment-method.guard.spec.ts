import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepPaymentMethodGuard } from './checkout-step-payment-method.guard';

describe('CheckoutStepPaymentMethodGuard', () => {
    let guard: CheckoutStepPaymentMethodGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(CheckoutStepPaymentMethodGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
