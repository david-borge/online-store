// Account Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from "./pages/account/account.component";

const accountRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo
   
    // Account Page
    {
        path: '',
        component: AccountComponent,
    },

];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forChild, no forRoot.
        RouterModule.forChild(accountRoutes)
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [
        RouterModule
    ]
})

export class AccountRoutingModule { }