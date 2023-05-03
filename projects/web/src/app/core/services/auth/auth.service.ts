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

        // Comprobación
        // console.log('Fecha actual: ' + new Date());
        // console.log('authCookieValue: ' + globalReducerData.authCookieValue);

        // Si authCookieValue no es ""
        if ( globalReducerData.authCookieValue != null && globalReducerData.authCookieValue != '' ) {
          
          // Si la fecha no está caducada (ahora es menor que la fecha de la cookie)
          if ( new Date() < new Date(globalReducerData.authCookieValue) ) {
            
            // Comprobación
            // console.log('La fecha de la cookie "auth" no está caducada (ahora es menor que la fecha de la cookie).');

            // Comprobar si la fecha está caducada
            fechaCookieAuthCaducada = false;

          }

        }

      }
    );

    // - Si la fecha no está caducada (ahora es menor que la fecha de la cookie): Global Store: loggedIn = true
    if ( !fechaCookieAuthCaducada ) {

      this.store.dispatch( GlobalActions.LogInStart({
        emailPayload: 'david.borge.olmedo@gmail.com',
        passwordPayload: '1234567890',
        lastLoginFullDatePayload: '',
      }) );
      // [No usado] this.store.dispatch( GlobalActions.SetLoggedInToTrue() );

    }

  }

  // Authentication - Sign Up (Registro)
  signUp(firstName: string, lastName: string, email: string, password: string, signUpFullDate: string, lastLoginFullDate: string) {
    
    // Comprobación
    // console.log('AuthService > Sign Up');

    this.store.dispatch( GlobalActions.SignUpStart({
      firstNamePayload: firstName,
      lastNamePayload: lastName,
      emailPayload: email,
      passwordPayload: password,
      signUpFullDatePayload: signUpFullDate,
      lastLoginFullDatePayload: lastLoginFullDate,
    }) );

  }

  // Authentication - Log In (Iniciar sesión)
  logIn(email: string, password: string, lastLoginFullDate: string) {

    // Comprobación
    // console.log('AuthService > Log In');

    this.store.dispatch( GlobalActions.LogInStart({
      emailPayload: email,
      passwordPayload: password,
      lastLoginFullDatePayload: lastLoginFullDate,
    }) );

  }

  authMessages(messageCode: string): string {

    switch (messageCode) {

      case 'SIGNUP_ERROR_HTTP_REQUEST_FAILED':
        return 'There was a problem signing up. Please try again.';

      case 'LOGIN_ERROR_HTTP_REQUEST_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > catch (Exception $e)
      case 'LOGIN_ERROR_LASTLOGINFULLDATE_UPDATE_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_LASTLOGINFULLDATE_UPDATE_FAILED',
      case 'LOGIN_ERROR_GET_USER_DATA_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_GET_USER_DATA_FAILED',
        return 'There was a problem loggin in. Please try again.';
    
      case 'SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > signup.php > exit("SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD");
        return 'The Sign Up API didn\'t recieve its payload.';
    
      case 'LOGIN_ERROR_API_DIDNT_RECIEVE_ITS_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > login.php > exit("SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD");
        return 'The Log In API didn\'t recieve its payload.';
    
      case 'LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE',
      case 'LOGIN_ERROR_PASSWORD_IS_NOT_CORRECT': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => true,
        return 'El email o la contraseña no es correcto.'; // Por temas de privacidad y seguridad, no digo al usuario que si el problema es que el email no existe o si es que la contraseña no es correcta
      
      case 'SQLSTATE[23000]': // Ver https://github.com/david-borge/online-store-backend > signup.php > catch (Exception $e)
        return 'Este email ya existe.';

      default:
        return '';

    }

  }

  logOut() {

    // Log Out: borrar cookie "auth" y Global Store > loggedIn = false
    this.store.dispatch( GlobalActions.LogOut() );

  }
  
}
