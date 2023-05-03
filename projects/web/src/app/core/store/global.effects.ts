/*** GlobalEffects ***/



import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs';

import * as GlobalActions from './global.actions';

import { CookiesService } from '../services/cookies/cookies.service';
import { DataStorageService } from '../services/data-storage/data-storage.service';
import { AuthService } from '../services/auth/auth.service';




@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class GlobalEffects {

    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action
    
    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
        private cookiesService: CookiesService,
        private dataStorageService: DataStorageService,
        private authService: AuthService,
    ) { }



    // Side Effect de la Set Local Storage Key Value Action de Global
    setLocalStorageKeyValueSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.SetLocalStorageKeyValue),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (setLocalStorageKeyValueActionData) => {

            // Aquí puedo usar los datos del payload de la Action: setLocalStorageKeyValueActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('setLocalStorageKeyValueActionData:');
            // console.log(setLocalStorageKeyValueActionData);

            // Guardar lastActiveMainPage en LocalStorage
            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)
                window.localStorage.setItem(setLocalStorageKeyValueActionData.localStorageKeyPayload, setLocalStorageKeyValueActionData.localStorageValuePayload);
            }

            // Como siempre hay que devolver una Action, devuelvo una DummyAction
            return of( GlobalActions.DummyAction() );
                
        }),

    ));



    // Side Effect de la Get Local Storage Value Start Action de Global
    getLocalStorageValueSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.GetLocalStorageValueStart),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (getLocalStorageValueActionData) => {

            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)

                // Aquí puedo usar los datos del payload de la Action: getLocalStorageValueActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getLocalStorageValueActionData:');
                // console.log(getLocalStorageValueActionData);

                // Leer valor de LocalStorage
                return of( GlobalActions.GetLocalStorageValueEnd({
                    localStorageKeyPayload: getLocalStorageValueActionData.localStorageKeyPayload,
                    localStorageValuePayload: window.localStorage.getItem(getLocalStorageValueActionData.localStorageKeyPayload),
                }) );

            }

            return of(); // Esto es solo para que no de errores al poner: if (isPlatformBrowser(this.platformId))
                
        }),

    ));
    


    // Side Effect de la Set Cookie Key Value Action de Global
    setCookieKeyValueSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.SetCookieKeyValue),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (setCookieKeyValueActionData) => {

            // Aquí puedo usar los datos del payload de la Action: setCookieKeyValueActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('setCookieKeyValueActionData:');
            // console.log(setCookieKeyValueActionData);

            // Guardar cookie
            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)
                // TODO: window.localStorage.setItem(setCookieKeyValueActionData.localStorageKeyPayload, setCookieKeyValueActionData.localStorageValuePayload);
            }

            // Como siempre hay que devolver una Action, devuelvo una DummyAction
            return of( GlobalActions.DummyAction() );
                
        }),

    ));



    // Side Effect de la Get Auth Token And Auth Expiration Date Cookies Values Start Action de Global
    getAuthAndExpirationDateCookiesValuesSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.GetAuthTokenAndAuthExpirationDateCookiesValuesStart),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (getAuthCookieValueActionData) => {

            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)

                // Aquí puedo usar los datos del payload de la Action: getAuthCookieValueActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getAuthCookieValueActionData:');
                // console.log(getAuthCookieValueActionData);

                // Comprobación
                // console.log('Value of cookie "authExpirationDate": ' + this.cookiesService.leerUnaCookie( "authExpirationDate" ));

                // Leer valor de cookie
                return of( GlobalActions.GetAuthAndExpirationDateCookiesValuesEnd({
                    authEmailCookieValuePayload:     this.cookiesService.leerUnaCookie( "authEmail" ),
                    authTokenCookieValuePayload:     this.cookiesService.leerUnaCookie( "authToken" ),
                    authExpirationDateCookiePayload: this.cookiesService.leerUnaCookie( "authExpirationDate" ),
                }) );

            }

            return of(); // Esto es solo para que no de errores al poner: if (isPlatformBrowser(this.platformId))
                
        }),

    ));



    // Side Effect de la Sign Up Action Start Action de Global
    signUpStartSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.SignUpStart),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (signUpStartActionData) => {

            // Aquí puedo usar los datos del payload de la Action: signUpStartActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('signUpStartActionData:');
            // console.log(signUpStartActionData);

            // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
            return this.dataStorageService.signUp(
                    signUpStartActionData.firstNamePayload,
                    signUpStartActionData.lastNamePayload,
                    signUpStartActionData.emailPayload,
                    signUpStartActionData.passwordPayload,
                    signUpStartActionData.signUpFullDatePayload,
                    signUpStartActionData.lastLoginFullDatePayload,
                    signUpStartActionData.tokenPayload,
                )
                .pipe(

                    /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                    switchMap(signUpHttpRequestResponseData => {

                        // Comprobación
                        console.log('signUpStartSideEffect - signUpHttpRequestResponseData:');
                        console.log(signUpHttpRequestResponseData);

                        // Procesamiento de datos si es necesario...

                        /* Si la API devuelve un mensaje de error.
                           No un Error 500, ya que eso aparece abajo en errorResponse;
                           si no, por ejemplo, si el email ya existe en la tabla.
                           Estos errores vienen de https://github.com/david-borge/online-store-backend > signup.php > catch (Exception $e)
                           Ejemplo: "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'"
                           Ejemplo del objeto completo: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'"}
                        */

                        // Comprobación
                        // console.log('signUpHttpRequestResponseData.resultado: ');
                        // console.log(signUpHttpRequestResponseData.resultado);

                        if( signUpHttpRequestResponseData.resultado == true ) {

                            // console.log("signUpStartSideEffect: OK!");

                            return of(

                                // Procesar datos si es necesario...
    
                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente

                                // Iniciar sesión automáticamente al hacer Sign Up
                                GlobalActions.LogInStart({
                                    emailPayload: signUpStartActionData.emailPayload,
                                    passwordPayload: signUpStartActionData.passwordPayload,
                                    lastLoginFullDatePayload: signUpStartActionData.lastLoginFullDatePayload,
                                    tokenPayload: signUpStartActionData.tokenPayload,
                                }),
    
                            );

                        } else {

                            // Comprobación
                            console.log("signUpStartSideEffect: La API devuelve un mensaje de error (no un Error 500, del tipo el email ya existe):");
                            console.log(signUpHttpRequestResponseData.resultado);

                            // Mensajes de error de MySQL o mis mensajes de error desde la API
                            // Si el un mensaje de error de MySQL: parto de "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'" y me quedo solo con el código de error "SQLSTATE[23000]"
                            let errorCode = ( signUpHttpRequestResponseData.resultado.includes(':') ? (signUpHttpRequestResponseData.resultado.substring(0, signUpHttpRequestResponseData.resultado.indexOf(":"))) : signUpHttpRequestResponseData.resultado );

                            // Comprobación
                            // console.log('signUpStartSideEffect > errorCode: ' + errorCode);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                GlobalActions.SignUpEndFailure({
                                    signUpResultFailurePayload: errorCode, // Ejemplo: SQLSTATE[23000]
                                }),
                            );

                        }

                    }),
                    catchError(errorResponse => {

                        // Error handling code...

                        // Mostrar el error en la consola
                        console.log('signUpStartSideEffect - errorResponse:');
                        console.log(errorResponse);

                        // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                        return of(
                            GlobalActions.SignUpEndFailure({
                                signUpResultFailurePayload: 'SIGNUP_ERROR_HTTP_REQUEST_FAILED',
                            }),
                        );

                    }),
                );

        }),

    ));



    // Side Effect de la Log In Action Start Action de Global
    logInStartSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.LogInStart),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (logInStartActionData) => {

            // Aquí puedo usar los datos del payload de la Action: logInStartActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('logInStartActionData:');
            // console.log(logInStartActionData);

            // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
            return this.dataStorageService.logIn(
                    logInStartActionData.emailPayload,
                    logInStartActionData.passwordPayload,
                    logInStartActionData.lastLoginFullDatePayload,
                    logInStartActionData.tokenPayload,
                )
                .pipe(

                    /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                    switchMap(logInHttpRequestResponseData => {

                        // TODO: Comprobación
                        // console.log('logInStartSideEffect - logInHttpRequestResponseData:');
                        // console.log(logInHttpRequestResponseData);

                        // Procesamiento de datos si es necesario...

                        /* Si la API devuelve un mensaje de error.
                           No un Error 500, ya que eso aparece abajo en errorResponse;
                           si no, por ejemplo, si el email no existe en la tabla.
                           Estos errores vienen de https://github.com/david-borge/online-store-backend > login.php > catch (Exception $e)
                           Ejemplo: "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'"
                           Ejemplo del objeto completo: {resultado: "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'"}
                           Otro ejemplo: LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE
                        */

                        // Comprobación
                        // console.log('logInHttpRequestResponseData.resultado: ');
                        // console.log(logInHttpRequestResponseData.resultado);

                        // Si el login ha sido exitoso (el email introducido en el formulario existe, la contraseña introducida en el form coincide la contraseña correspondiente en la de la Base de Datos y he guardado el lastLoginFullDate)
                        if( logInHttpRequestResponseData.resultado == true ) {

                            // console.log("logInStartSideEffect: OK!");

                            return of(

                                // Procesar datos si es necesario...
    
                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                GlobalActions.SignUpLogInEndSuccess({
                                    firstNamePayload: logInHttpRequestResponseData.firstName,
                                    lastNamePayload: logInHttpRequestResponseData.lastName,
                                    emailPayload: logInStartActionData.emailPayload,
                                    tokenPayload: logInStartActionData.tokenPayload,
                                }), // loggedIn a true y crear cookies "authToken" y "authExpirationDate"
    
                            );

                        }
                        
                        // Si el log in ha fallado (el email no existe o ha fallado la actualización de lastLoginFullDate)
                        // Ejemplo: LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE
                        else {

                            // Comprobación
                            console.log("logInStartSideEffect: La API devuelve un mensaje de error (no un Error 500, del tipo el email ya existe):");
                            console.log(logInHttpRequestResponseData.resultado);

                            // Mensajes de error de MySQL o mis mensajes de error desde la API
                            // Si el un mensaje de error de MySQL: Parto de "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'hewemim@mailinator.com' for key 'users.email'" y me quedo solo con el código de error "SQLSTATE[23000]"
                            let errorCode = ( logInHttpRequestResponseData.resultado.includes(':') ? (logInHttpRequestResponseData.resultado.substring(0, logInHttpRequestResponseData.resultado.indexOf(":"))) : logInHttpRequestResponseData.resultado );

                            // Comprobación
                            console.log('logInStartSideEffect > errorCode: ' + errorCode);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                GlobalActions.LogInEndFailure({
                                    logInResultFailurePayload: errorCode, // Ejemplo: LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE
                                }),
                            );

                        }

                    }),
                    catchError(errorResponse => {

                        // Error handling code...

                        // Mostrar el error en la consola
                        console.log('logInStartSideEffect - errorResponse:');
                        console.log(errorResponse);

                        // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                        return of(
                            GlobalActions.LogInEndFailure({
                                logInResultFailurePayload: 'LOGIN_ERROR_HTTP_REQUEST_FAILED',
                            }),
                        );

                    }),
                );

        }),

    ));



    // Side Effect de la Sign Up Log In Action End Success Action de Global
    // Crear las cookies "authToken" y "authExpirationDate"
    signUpLogInEndSuccessSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.SignUpLogInEndSuccess),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (logInEndSuccessActionData) => {

            // Aquí puedo usar los datos del payload de la Action: logInEndSuccessActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('logInEndSuccessActionData:');
            // console.log(logInEndSuccessActionData);

            // Guardar cookies "authToken" y "authExpirationDate" con el valor del token de autentificación (generado aleatoriamente) y de la fecha de expiración (ahora + 7 días), ambas con una duración de 7 días
            // Nota: hay que almacenarlo en dos cookies distintas porque desde JS no se puede leer la fecha de expiración de una cookie
            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)
                let logInDuration = 7; // En días (los que yo quiera)
                this.cookiesService.ponerCookie("authEmail", logInEndSuccessActionData.emailPayload, logInDuration);
                this.cookiesService.ponerCookie("authToken", logInEndSuccessActionData.tokenPayload, logInDuration);
                this.cookiesService.ponerCookie("authExpirationDate", (this.addDays(new Date(), logInDuration)).toString(), logInDuration);
            }

            // Como siempre hay que devolver una Action, devuelvo una DummyAction
            return of( GlobalActions.DummyAction() );
                
        }),

    ));

    addDays(date: Date, days: number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }



    // Side Effect de la Log Out Action de Global
    logOutSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.LogOut),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (logOutActionData) => {

            // Aquí puedo usar los datos del payload de la Action: logOutActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            // console.log('logOutActionData:');
            // console.log(logOutActionData);

            // Borrar cookies "authToken" y "authExpirationDate"
            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)
                this.cookiesService.eliminarUnaCookie("authEmail");
                this.cookiesService.eliminarUnaCookie("authExpirationDate");
                this.cookiesService.eliminarUnaCookie("authToken");
            }

            // Como siempre hay que devolver una Action, devuelvo una DummyAction
            return of( GlobalActions.DummyAction() );
                
        }),

    ));



}