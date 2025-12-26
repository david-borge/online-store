// Checkout step - ''/checkout/signup-login''
// If user is logged in, redirect from '/checkout/signup-login' to '/checkout/address'

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';


import { GetCartDataPHPInterface } from '../../models/GetCartDataPHP.interface';
import { AuthService } from '../../services/auth/auth.service';
import * as fromApp from '../../store/app.reducer'; // el fromNombreComponente es una convención de NgRx



@Injectable({
    providedIn: 'root',
})
export class CheckoutStepSignupLoginGuard {
    cartData: GetCartDataPHPInterface['cartData'] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        private store: Store<fromApp.AppState>,
    ) {
        // Cart Store
        this.store.select('cartReducerObservable').subscribe((cartReducerData) => {
            this.cartData = cartReducerData.cartData;
        });
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        /* // Comprobacion
    console.log('userIsLoggedIn: ' + this.authService.checkIfUserIsLoggedIn());
    
    // If the user is NOT logged in, redirect from '/checkout/signup-login' to '/home'
    if ( !this.authService.checkIfUserIsLoggedIn() ) {
      this.router.navigate(['/home']);
    }

    // If user is logged in...
    else {

      // Comprobacion
      console.log('this.cartData.length: ' + this.cartData.length);

      // ...and there are NO products in the Cart, redirect from '/checkout/signup-login' to '/home'
      if ( this.cartData.length == 0 ) {
        this.router.navigate(['/home']);
      }

      // ...and there are products in the Cart, redirect from '/checkout/signup-login' to '/checkout/address'
      else {
        this.router.navigate(['/checkout/address']);
      }

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
