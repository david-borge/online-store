import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CartCheckoutProductCardComponent } from './cart-checkout-product-card.component';

describe('CartCheckoutProductCardComponent', () => {
    let component: CartCheckoutProductCardComponent;
    let fixture: ComponentFixture<CartCheckoutProductCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartCheckoutProductCardComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CartCheckoutProductCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
