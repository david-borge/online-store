// PaymentMethods Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInnerPagesGuard } from '@core/guards/account-inner-pages/account-inner-pages.guard';

import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';

const paymentMethodsRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo

    // PaymentMethods Page ('/payment-methods')
    {
        path: '',
        canActivate: [AccountInnerPagesGuard], // If user is NOT logged in, redirect from '/payment-methods' to '/account'
        component: PaymentMethodsComponent,
    },
];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forChild, no forRoot.
        RouterModule.forChild(paymentMethodsRoutes),
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [RouterModule],
})
export class PaymentMethodsRoutingModule {}
