// Product Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from "./pages/product/product.component";

const productRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo
   
    // Product Page
    {
        path: '',
        component: ProductComponent,
    },

];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forChild, no forRoot.
        RouterModule.forChild(productRoutes)
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [
        RouterModule
    ]
})

export class ProductRoutingModule { }