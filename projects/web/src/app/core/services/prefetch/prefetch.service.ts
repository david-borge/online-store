// Proceso de carga de una página: Paso 2.1. Con pre-fetch, hacer una HTTP Request a la API de Backend para descargar datos desde la Base de Datos. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts



import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';
import * as OrderActions from '../../../features/ecommerce/order/store/order.actions';


@Injectable({
  providedIn: 'root'
})
export class PreFetchService {

  orderNumber: number = 0;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {

    this.store.select('orderReducerObservable').subscribe(
      orderReducerData => {
        this.orderNumber = orderReducerData.currentOrderNumber;
      }
    );

  }

  prefetchList(elementosAprefetch: string[]): void {

    elementosAprefetch.forEach(elementosprefetch => {
      
      this.prefetch( elementosprefetch );

    });

  }

  prefetch(elementoAprefetch: string): void {

    // Comprobacion
    // console.log('elementoAprefetch: ' + elementoAprefetch);

    // Hago el pre-fetch de lo que necesite en cada caso
    switch ( elementoAprefetch ) {

      case 'home':
        // Cargar los productos a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( HomeActions.GetAllProductsStart() ); // Proceso de carga de una página: Paso 2.2. Cuando termine la HTTP Request, guardar los datos en la Store correspondiente.
        break;

      case 'categories':
        // Cargar las categorias a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( CategoriesActions.GetAllCategoriesStart() ); // Proceso de carga de una página: Paso 2.2. Cuando termine la HTTP Request, guardar los datos en la Store correspondiente.
        break;

      default:
        break;
    }

  }

}
