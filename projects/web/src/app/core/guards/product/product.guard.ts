import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CartActions from '../../../features/ecommerce/cart/store/cart.actions';

@Injectable({
    providedIn: 'root',
})
export class ProductGuard implements CanDeactivate<unknown> {
    constructor(private store: Store<fromApp.AppState>) {}

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Comprobacion
        // console.log('ProductGuard canDeactivate');

        // Resetear addProductToCartStatus para que el check icon del "Add to cart" button se quite en caso de que el usuario pase a la página de checkout antes de que hayan pasado los 1500ms del check icon
        this.store.dispatch(CartActions.ResetAddProductToCartStatusProperty());

        return true;
    }
}
