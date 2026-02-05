import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepOrderConfirmationGuard } from './checkout-step-order-confirmation.guard';

describe('CheckoutStepOrderConfirmationGuard', () => {
    let guard: CheckoutStepOrderConfirmationGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(CheckoutStepOrderConfirmationGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
