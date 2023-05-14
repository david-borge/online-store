import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { CheckoutStepAddressComponent } from './pages/checkout-step-address/checkout-step-address/checkout-step-address.component';
import { CheckoutStepPaymentMethodComponent } from './pages/checkout-step-payment-method/checkout-step-payment-method/checkout-step-payment-method.component';
import { CheckoutStepSignUpComponent } from './pages/checkout-step-sign-up/checkout-step-sign-up/checkout-step-sign-up.component';
import { CheckoutStepOrderReviewComponent } from './pages/checkout-step-order-review/checkout-step-order-review/checkout-step-order-review.component';
import { CheckoutStepOrderConfirmationComponent } from './pages/checkout-step-order-confirmation/checkout-step-order-confirmation/checkout-step-order-confirmation.component';



@NgModule({
  declarations: [
    CheckoutStepAddressComponent,
    CheckoutStepPaymentMethodComponent,
    CheckoutStepSignUpComponent,
    CheckoutStepOrderReviewComponent,
    CheckoutStepOrderConfirmationComponent
  ],
  imports: [
    CommonModule,

    CheckoutRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class CheckoutModule { }
