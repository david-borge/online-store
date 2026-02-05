import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepPaymentMethodComponent } from './checkout-step-payment-method.component';

describe('CheckoutStepPaymentMethodComponent', () => {
    let component: CheckoutStepPaymentMethodComponent;
    let fixture: ComponentFixture<CheckoutStepPaymentMethodComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepPaymentMethodComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepPaymentMethodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
