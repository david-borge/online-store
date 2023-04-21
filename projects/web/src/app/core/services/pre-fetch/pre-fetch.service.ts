import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';


@Injectable({
  providedIn: 'root'
})
export class PreFetchService {

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  prefetch(elementoAprefetch: string): void {

    // Hago el pre-fetch de lo que necesite en cada caso
    switch ( elementoAprefetch ) {

      case 'home':
        // Cargar los productos a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( HomeActions.GetAllProductsStart() );
        break;

      case 'categories':
        // Cargar las categorias a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( CategoriesActions.GetAllCategoriesStart() );
        break;
      
      default:
        break;
    }

  }

}
