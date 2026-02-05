import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepSignupLoginComponent } from './checkout-step-signup-login.component';

describe('CheckoutStepSignupLoginComponent', () => {
    let component: CheckoutStepSignupLoginComponent;
    let fixture: ComponentFixture<CheckoutStepSignupLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepSignupLoginComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepSignupLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
