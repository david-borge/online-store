/*** OrdersEffects ***/

import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { CookiesService } from '@core/services/cookies/cookies.service';
import { DataStorageService } from '@core/services/data-storage/data-storage.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

import * as OrdersActions from './orders.actions';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class OrdersEffects {
    private actionsObservable = inject(Actions);
    private dataStorageService = inject(DataStorageService);
    private store = inject<Store<fromApp.AppState>>(Store);
    private cookiesService = inject(CookiesService);

    // Side Effect de la Get Orders Start Action de Order
    getOrdersSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(OrdersActions.GetOrdersStart),

            withLatestFrom(this.store.select('ordersReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((_getOrdersStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getOrdersStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getOrdersStartActionData:');
                // console.log(getOrdersStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .getOrdersHttpRequest(this.cookiesService.leerUnaCookie('authToken'))
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getOrdersHttpRequestResponse) => {
                            // Comprobación
                            // console.log('getOrdersSideEffect - getOrdersHttpRequestResponse:');
                            // console.log(getOrdersHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                OrdersActions.GetOrdersEndSuccess({
                                    ordersPayload: getOrdersHttpRequestResponse.orders,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getOrdersSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                OrdersActions.GetOrdersEndFailure({
                                    getOrdersErrorMessagePayload:
                                        'There was an error when loading the Order data.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );
}
