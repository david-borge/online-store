import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CheckoutStepOrderReviewComponent } from './checkout-step-order-review.component';

describe('CheckoutStepOrderReviewComponent', () => {
    let component: CheckoutStepOrderReviewComponent;
    let fixture: ComponentFixture<CheckoutStepOrderReviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepOrderReviewComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepOrderReviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
