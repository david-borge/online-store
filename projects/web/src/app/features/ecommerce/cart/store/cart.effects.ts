/*** CartEffects ***/



import { Injectable } from '@angular/core';

import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as CartActions from './cart.actions';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';
import { CookiesService } from 'projects/web/src/app/core/services/cookies/cookies.service';

import { GetCartDataPHPInterface } from 'projects/web/src/app/core/models/GetCartDataPHP.interface';



@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class CartEffects {

    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action
    
    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        private store: Store<fromApp.AppState>,
        private dataStorageService: DataStorageService,
        private cookiesService: CookiesService,
    ) { }



    // Side Effect de la Get All Countries Start Action de Cart
    getCartDataSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(CartActions.GetCartDataStart),

        withLatestFrom( this.store.select('cartReducerObservable') ),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (getCartDataStartActionData) => {

            // Aquí puedo usar los datos del payload de la Action: getCartDataStartActionData.nombrePayloadPayload.propiedad1

            // Comprobación
            console.log('getCartDataStartActionData:');
            console.log(getCartDataStartActionData);

        
            // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
            return this.dataStorageService.getCartDataHttpRequest(this.cookiesService.leerUnaCookie("authToken"))
                .pipe(

                    /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                    switchMap( (getCartDataHttpRequestResponse) => {

                        // Comprobación
                        console.log('getCartDataSideEffect - getCartDataHttpRequestResponse:');
                        console.log(getCartDataHttpRequestResponse);

                        // Procesamiento de datos si es necesario...
                        // if (getCartDataHttpRequestResponse.resultado == 'GET_CART_DATA_NO_DATA') {
                                
                        // } else {
                            
                        // }
                        return of(

                            // Procesar datos si es necesario...

                            // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                            CartActions.GetCartDataEndSuccess({
                                cartDataPayload: getCartDataHttpRequestResponse,
                            }),

                        );

                    }),
                    catchError(errorResponse => {

                        // Error handling code...

                        // Mostrar el error en la consola
                        console.log('getCartDataSideEffect - errorResponse:');
                        console.log(errorResponse);

                        // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                        return of(
                            CartActions.GetCartDataEndFailure({
                                getCartDataErrorMessagePayload: 'There was an error when loading the Country list.',
                            }),
                        );

                    }),
            );

        }),

    ));



}