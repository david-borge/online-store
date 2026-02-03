import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-checkout-step-order-confirmation',
    templateUrl: './checkout-step-order-confirmation.component.html',
    styleUrls: ['./checkout-step-order-confirmation.component.scss'],
    host: {
        class: 'app-checkout-step-order-confirmation--class-for-router-outlet',
    },
})
export class CheckoutStepOrderConfirmationComponent {
    private readonly router = inject(Router);

    onClickContinueToStoreButton() {
        this.router.navigate(['/home']);
    }
}
