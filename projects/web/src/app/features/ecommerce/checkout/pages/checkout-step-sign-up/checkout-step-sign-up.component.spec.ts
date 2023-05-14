import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepSignUpComponent } from './checkout-step-sign-up.component';

describe('CheckoutStepSignUpComponent', () => {
  let component: CheckoutStepSignUpComponent;
  let fixture: ComponentFixture<CheckoutStepSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutStepSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
