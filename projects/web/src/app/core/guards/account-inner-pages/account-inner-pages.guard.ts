// Account inner pages:
//  - '/orders'
//  - '/order/:order-number'
//  - '/addresses'
//  - '/payment-methods'
// If user is logged in, redirect from '/checkout/signup-login' to '/checkout/address'


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountInnerPagesGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // If user is NOT logged in, redirect from '/orders' or '/order/:order-number' or '/addresses' or '/payment-methods' to '/account'
    if ( !this.authService.checkIfUserIsLoggedIn() ) {
      this.router.navigate(['/account']);
    }
    
    return true;

  }
  


  /* Función canActivateChild(): lo mismo, pero también protege las rutas hijas de la ruta actual. */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.canActivate(route, state);
    
  }


  
}
