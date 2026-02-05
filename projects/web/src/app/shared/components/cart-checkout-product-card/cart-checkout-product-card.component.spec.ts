import { CurrencyPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import { CurrencyFormatPipe } from '@core/pipes/currency-format.pipe';
import * as fromApp from '@core/store/app.reducer';

import { CartCheckoutProductCardComponent } from './cart-checkout-product-card.component';

describe('CartCheckoutProductCardComponent', () => {
    let component: CartCheckoutProductCardComponent;
    let fixture: ComponentFixture<CartCheckoutProductCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartCheckoutProductCardComponent],
            imports: [CurrencyFormatPipe],
            providers: [provideRouter([]), provideStore(fromApp.appReducer), CurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CartCheckoutProductCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
