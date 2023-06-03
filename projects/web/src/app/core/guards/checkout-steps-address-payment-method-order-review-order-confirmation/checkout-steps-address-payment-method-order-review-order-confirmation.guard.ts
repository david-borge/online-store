// Checkout steps:
  // - '/checkout/address'
  // - '/checkout/payment-method'
  // - '/checkout/order-review'
  // - '/checkout/order-confirmation'
// If user is NOT logged in, redirect from '/checkout/signup-login' or '/checkout/payment-method' or '/checkout/order-review' or '/checkout/order-confirmation' to '/checkout/signup-login'


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStepsAddressPaymentMethodOrderReviewOrderConfirmationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // If user is NOT logged in, redirect from '/checkout/signup-login' or '/checkout/payment-method' or '/checkout/order-review' or '/checkout/order-confirmation' to '/home'
    if ( !this.authService.checkIfUserIsLoggedIn() ) {
      this.router.navigate(['/home']);
    }
    
    return true;
    
  }



  /* Función canActivateChild(): lo mismo, pero también protege las rutas hijas de la ruta actual. */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.canActivate(route, state);
    
  }



}
