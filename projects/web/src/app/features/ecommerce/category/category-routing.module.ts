// Category Module Routing
/* Array de las rutas de este módulo (cada ruta es un objeto JS):
    - path: lo que aparece en la URL después del dominio (no hace falta poner el /)
    - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryComponent } from './pages/category/category.component';

const categoryRoutes: Routes = [
    // Parte de appRoutes de src/app/app-routing.module.ts relativa al nuevo módulo

    // Category Page (/category/tech)
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'tech', // Si se entra a /category, le llevo a la categoría por defecto, que es tech (category/tech)
                pathMatch: 'full',
            },
            {
                path: ':category-slug', // Route parameter
                component: CategoryDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        // En los módulos que no sean AppModule, hay que usar forChild, no forRoot.
        RouterModule.forChild(categoryRoutes),
    ],

    // Exportar RouterModule para poder importarlo en AppModule
    exports: [RouterModule],
})
export class CategoryRoutingModule {}
