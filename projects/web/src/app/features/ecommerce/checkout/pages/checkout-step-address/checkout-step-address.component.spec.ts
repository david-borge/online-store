import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepAddressComponent } from './checkout-step-address.component';

describe('CheckoutStepAddressComponent', () => {
    let component: CheckoutStepAddressComponent;
    let fixture: ComponentFixture<CheckoutStepAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepAddressComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
