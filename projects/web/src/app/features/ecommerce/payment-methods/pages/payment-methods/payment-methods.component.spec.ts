import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { PaymentMethodsComponent } from './payment-methods.component';

describe('PaymentMethodsComponent', () => {
    let component: PaymentMethodsComponent;
    let fixture: ComponentFixture<PaymentMethodsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaymentMethodsComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentMethodsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
