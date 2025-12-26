import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CartActions from '../../../features/ecommerce/cart/store/cart.actions';

@Injectable({
    providedIn: 'root',
})
export class ProductGuard {
    private store = inject<Store<fromApp.AppState>>(Store);

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
