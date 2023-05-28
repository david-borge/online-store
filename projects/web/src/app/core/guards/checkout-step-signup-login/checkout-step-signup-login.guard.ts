// Checkout step - ''/checkout/signup-login''
// If user is logged in, redirect from '/checkout/signup-login' to '/checkout/address'


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutStepSignupLoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // If user is logged in, redirect from '/checkout/signup-login' to '/checkout/address'
    if ( this.authService.checkIfUserIsLoggedIn() ) {
      this.router.navigate(['/checkout/address']);
    }
    
    return true;
    
  }
  


  /* Función canActivateChild(): lo mismo, pero también protege las rutas hijas de la ruta actual. */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.canActivate(route, state);
    
  }


  
}
