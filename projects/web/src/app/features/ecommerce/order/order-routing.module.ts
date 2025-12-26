// Order Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInnerPagesGuard } from '../../../core/guards/account-inner-pages/account-inner-pages.guard';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderComponent } from './pages/order/order.component';

const orderRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo

    // Order Page (/order/1234)
    {
        path: '',
        component: OrderComponent,

        children: [
            {
                path: '',
                redirectTo: '/orders', // Si se entra a /order, le llevo a la Orders Page // TODO: cuidado con si no se ha iniciado sesión
                pathMatch: 'full',
            },
            {
                path: ':order-number', // Route parameter
                canActivate: [AccountInnerPagesGuard], // If user is NOT logged in, redirect from '/order/:order-number' to '/account'
                component: OrderDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forChild, no forRoot.
        RouterModule.forChild(orderRoutes),
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [RouterModule],
})
export class OrderRoutingModule {}
