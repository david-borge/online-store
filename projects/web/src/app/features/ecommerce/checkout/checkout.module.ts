import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutStepAddressComponent } from './pages/checkout-step-address/checkout-step-address.component';
import { CheckoutStepOrderConfirmationComponent } from './pages/checkout-step-order-confirmation/checkout-step-order-confirmation.component';
import { CheckoutStepOrderReviewComponent } from './pages/checkout-step-order-review/checkout-step-order-review.component';
import { CheckoutStepPaymentMethodComponent } from './pages/checkout-step-payment-method/checkout-step-payment-method.component';
import { CheckoutStepSignupLoginComponent } from './pages/checkout-step-sign-up/checkout-step-signup-login.component';

@NgModule({
    declarations: [
        CheckoutStepAddressComponent, CheckoutStepOrderConfirmationComponent, CheckoutStepOrderReviewComponent, CheckoutStepPaymentMethodComponent, CheckoutStepSignupLoginComponent,
    ],
    imports: [CheckoutRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class CheckoutModule {}
