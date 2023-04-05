// /* Page Routing
//   Array de todas las rutas de la aplicación (cada ruta es un objeto JS):
//     - path: lo que aparece en la URL después del dominio (no hace falta poner el / inicial)
//     - component: el componente que se carga cuando se llegue a la ruta definida en path. El componente viene a ser la nueva página
// */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { LoadingScreenComponent } from './features/ecommerce/loading-screen/pages/loading-screen/loading-screen.component';


const routes: Routes = [

  // Ruta de la página de inicio
  {
      path: '',  // Página de inicio (sin nada después del dominio)
      component: LoadingScreenComponent,  // NO usar el AppComponent
      pathMatch: 'full',  // Since the default value of pathMatch is 'prefix', Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing"). To fix this behavior, you need to change the matching strategy to 'full'. Ver: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656336
  },

  // Home Page
  {
    path: 'home',
    loadChildren: () => import('./features/ecommerce/ecommerce.module').then( (modulo) => modulo.EcommerceModule )
  },

  // Product Page
  {
    path: 'product',
    loadChildren: () => import('./features/ecommerce/product/product.module').then( (modulo) => modulo.ProductModule )
  },

  // Categories Page (/categories)
  {
    path: 'categories',
    loadChildren: () => import('./features/ecommerce/categories/categories.module').then( (modulo) => modulo.CategoriesModule )
  },

  // Category Page (/category/tech)
  {
    path: 'category',
    loadChildren: () => import('./features/ecommerce/category/category.module').then( (modulo) => modulo.CategoryModule )
  },
  
  // Cart Page
  {
    path: 'cart',
    loadChildren: () => import('./features/ecommerce/cart/cart.module').then( (modulo) => modulo.CartModule )
  },
  
  // Account Page
  {
    path: 'account',
    loadChildren: () => import('./features/ecommerce/account/account.module').then( (modulo) => modulo.AccountModule )
  },
  
  // Orders Page
  {
    path: 'orders',
    loadChildren: () => import('./features/ecommerce/orders/orders.module').then( (modulo) => modulo.OrdersModule )
  },

  // Order Page (/order/1234)
  {
    path: 'order',
    loadChildren: () => import('./features/ecommerce/order/order.module').then( (modulo) => modulo.OrderModule )
  },

  // Addresses Page
  {
    path: 'addresses',
    loadChildren: () => import('./features/ecommerce/addresses/addresses.module').then( (modulo) => modulo.AddressesModule )
  },

  // Payment Methods Page
  {
    path: 'payment-methods',
    loadChildren: () => import('./features/ecommerce/payment-methods/payment-methods.module').then( (modulo) => modulo.PaymentMethodsModule )
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Configuración de las rutas
      // useHash: true  // FIXME: (en Ionos parece que sí ocurre) (SOLO si es imprescindible) Para solucionar el caso de que el servidor no devuelva el index.html de la App Angular en caso de error 404 (https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656364)
      preloadingStrategy: PreloadAllModules  // Precargar todos los módulos que se carguen con Lazy Loading
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
