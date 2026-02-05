import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepAddressGuard } from './checkout-step-address.guard';

describe('CheckoutStepAddressGuard', () => {
    let guard: CheckoutStepAddressGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(CheckoutStepAddressGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
