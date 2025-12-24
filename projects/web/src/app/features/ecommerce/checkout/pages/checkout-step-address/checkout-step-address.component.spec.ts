import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepAddressComponent } from './checkout-step-address.component';

describe('CheckoutStepAddressComponent', () => {
    let component: CheckoutStepAddressComponent;
    let fixture: ComponentFixture<CheckoutStepAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepAddressComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
