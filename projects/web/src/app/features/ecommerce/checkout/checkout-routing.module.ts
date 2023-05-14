// Checkout Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CheckoutStepSignUpComponent } from "./pages/checkout-step-sign-up/checkout-step-sign-up/checkout-step-sign-up.component";
import { CheckoutStepAddressComponent } from "./pages/checkout-step-address/checkout-step-address/checkout-step-address.component";
import { CheckoutStepPaymentMethodComponent } from "./pages/checkout-step-payment-method/checkout-step-payment-method/checkout-step-payment-method.component";
import { CheckoutStepOrderReviewComponent } from "./pages/checkout-step-order-review/checkout-step-order-review/checkout-step-order-review.component";
import { CheckoutStepOrderConfirmationComponent } from "./pages/checkout-step-order-confirmation/checkout-step-order-confirmation/checkout-step-order-confirmation.component";


const checkoutRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo
   
    // Checkout Step Page: Address (/checkout)
    {
        path: '',
        component: CheckoutStepAddressComponent,
        pathMatch: 'full',  // Since the default value of pathMatch is 'prefix', Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing"). To fix this behavior, you need to change the matching strategy to 'full'. Ver: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656336
    },
   
    // Checkout Step Page: Sign Up (/checkout/sign-up)
    {
        path: 'sign-up',
        component: CheckoutStepSignUpComponent,
    },

    // Checkout Step Page: Address (/checkout/address)
    {
        path: 'address',
        component: CheckoutStepAddressComponent,
    },
   
    // Checkout Step Page: Payment Method (/checkout/payment-method)
    {
        path: 'payment-method',
        component: CheckoutStepPaymentMethodComponent,
    },
   
    // Checkout Step Page: Order Review (/checkout/order-review)
    {
        path: 'order-review',
        component: CheckoutStepOrderReviewComponent,
    },
   
    // Checkout Step Page: Order Confirmation (/checkout/order-confirmation)
    {
        path: 'order-confirmation',
        component: CheckoutStepOrderConfirmationComponent,
    },
   
];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forCheckouthild, no forRoot.
        RouterModule.forChild(checkoutRoutes),
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [
        RouterModule
    ]
})

export class CheckoutRoutingModule { }