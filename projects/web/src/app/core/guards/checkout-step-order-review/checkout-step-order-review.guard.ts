// Checkout step: '/checkout/address'

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { GetCartDataPHPInterface } from '@core/models/GetCartDataPHP.interface';
import { AuthService } from '@core/services/auth/auth.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Injectable({
    providedIn: 'root',
})
export class CheckoutStepOrderReviewGuard {
    private router = inject(Router);
    private authService = inject(AuthService);
    private store = inject<Store<fromApp.AppState>>(Store);

    cartData: GetCartDataPHPInterface['cartData'] = [];

    constructor() {
        // Cart Store
        this.store.select('cartReducerObservable').subscribe((cartReducerData) => {
            this.cartData = cartReducerData.cartData;
        });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        /* // If the user is NOT logged in or there are no products in the cart, redirect from '/checkout/payment-method' or '/checkout/order-review' or '/checkout/order-confirmation' to '/home'
    if ( !this.authService.checkIfUserIsLoggedIn() || (this.cartData.length == 0) ) {
      this.router.navigate(['/home']);
    } */

        return true;
    }

    /* Función canActivateChild(): lo mismo, pero también protege las rutas hijas de la ruta actual. */
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(route, state);
    }
}
