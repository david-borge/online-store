import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepSignupLoginGuard } from './checkout-step-signup-login.guard';

describe('CheckoutStepSignupLoginGuard', () => {
    let guard: CheckoutStepSignupLoginGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(CheckoutStepSignupLoginGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
