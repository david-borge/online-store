import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepOrderReviewGuard } from './checkout-step-order-review.guard';

describe('CheckoutStepOrderReviewGuard', () => {
    let guard: CheckoutStepOrderReviewGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(CheckoutStepOrderReviewGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
