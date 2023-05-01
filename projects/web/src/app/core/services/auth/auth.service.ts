/*
  *** Authentication Service ***
  Proceso de Autentificación (Sign Up / Log In): https://docs.google.com/document/d/1QQ8aXD48xA9Iu7Uhvps1r2fUzNcRCpd5X_n41F0AiPU/edit?usp=sharing
*/


import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { take } from 'rxjs';

import * as fromApp from '../../store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../store/global.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  // Authentication - Comprobar si el usuario está logueado (leer la cookie “auth”, guardar su valor en la Global Store y ajustar el valor de loggedIn de la Global Store acordemente)
  checkIfUserIsLoggedIn(): void {

    let fechaCookieAuthCaducada: boolean = true;

    // - Leer la cookie “auth” y guardar su valor en la Global Store
    this.store.dispatch( GlobalActions.GetAuthCookieValueStart() );

    // - Comprobar si estoy logueado en la app: comprobar el valor de Global Store > authCookieValue
    // Si authCookieValue no es "" y si la fecha no está caducada (ahora es menor que la fecha de la cookie): Global Store: loggedIn = true
    this.store.select("globalReducerObservable").pipe(take(1)).subscribe(
      (globalReducerData) => {

        // Comprobacion
        // console.log('Fecha actual: ' + new Date());
        // console.log('authCookieValue: ' + globalReducerData.authCookieValue);

        // Si authCookieValue no es ""
        if ( globalReducerData.authCookieValue != null && globalReducerData.authCookieValue != '' ) {
          
          // Si la fecha no está caducada (ahora es menor que la fecha de la cookie)
          if ( new Date() < new Date(globalReducerData.authCookieValue) ) {
            
            // Comprobacion
            // console.log('La fecha de la cookie "auth" no está caducada (ahora es menor que la fecha de la cookie).');

            // Comprobar si la fecha está caducada
            fechaCookieAuthCaducada = false;

          }

        }

      }
    );

    // - Si la fecha no está caducada (ahora es menor que la fecha de la cookie): Global Store: loggedIn = true
    if ( !fechaCookieAuthCaducada ) {
      this.store.dispatch( GlobalActions.SetLoggedInToTrue() );
    }

  }

  // Authentication - Sign Up (Registro)
  signUp(firstName: string, lastName: string, email: string, password: string) {
    
    // Comprobacion
    // console.log('Sign Up');

    this.store.dispatch( GlobalActions.SignUpStart({
      firstNamePayload: firstName,
      lastNamePayload: lastName,
      emailPayload: email,
      passwordPayload: password,
    }) );

  }

  // Authentication - Log In (Iniciar sesión)
  logIn(email: string, password: string) {

    // Comprobacion
    // console.log('Log In');

    // this.store.dispatch( GlobalActions.LogIn() );

  }

  authMessages(messageCode: string): string {

    switch (messageCode) {

      case 'LOGIN_ERROR_HTTP_REQUEST_FAILED':
        return 'There was a problem loggin in. Please try again.';
    
      default:
        return '';

    }

  }
  
}