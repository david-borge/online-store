import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepSignupLoginComponent } from './checkout-step-signup-login.component';

describe('CheckoutStepSignupLoginComponent', () => {
    let component: CheckoutStepSignupLoginComponent;
    let fixture: ComponentFixture<CheckoutStepSignupLoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckoutStepSignupLoginComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckoutStepSignupLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
