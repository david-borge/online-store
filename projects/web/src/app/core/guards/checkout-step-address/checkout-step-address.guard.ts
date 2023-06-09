// Checkout step: '/checkout/address'


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { AuthService } from '../../services/auth/auth.service';

import { GetCartDataPHPInterface } from '../../models/GetCartDataPHP.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStepAddressGuard implements CanActivate {

  cartData: GetCartDataPHPInterface["cartData"] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) {

    // Cart Store
    this.store.select( 'cartReducerObservable' ).subscribe(
      cartReducerData => {

        this.cartData = cartReducerData.cartData;

      }
    );

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    /* // If the user is NOT logged in or there are no products in the cart, redirect from '/checkout/payment-method' or '/checkout/order-review' or '/checkout/order-confirmation' to '/home'
    if ( !this.authService.checkIfUserIsLoggedIn() || (this.cartData.length == 0) ) {
      this.router.navigate(['/home']);
    } */

    return true;
    
  }



  /* Función canActivateChild(): lo mismo, pero también protege las rutas hijas de la ruta actual. */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.canActivate(route, state);
    
  }



}
