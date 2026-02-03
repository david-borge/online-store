/*** OrderEffects ***/

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { CookiesService } from '@core/services/cookies/cookies.service';
import { DataStorageService } from '@core/services/data-storage/data-storage.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CartActions from '@features/ecommerce/cart/store/cart.actions';

import * as OrderActions from './order.actions';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class OrderEffects {
    private readonly actionsObservable = inject(Actions);
    private readonly dataStorageService = inject(DataStorageService);
    private readonly store = inject<Store<fromApp.AppState>>(Store);
    private readonly cookiesService = inject(CookiesService);
    private readonly router = inject(Router);

    // Side Effect de la Get Order Data Start Action de Order
    getOrderDataSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(OrderActions.GetOrderDataStart),

            withLatestFrom(this.store.select('orderReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getOrderDataStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getOrderDataStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getOrderDataStartActionData:');
                // console.log(getOrderDataStartActionData);

                // Comprobacion: orderNumber
                // console.log('getOrderDataStartActionData[0].orderNumberPayload: ' + getOrderDataStartActionData[0].orderNumberPayload);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .getOrderDataHttpRequest(getOrderDataStartActionData[0].orderNumberPayload)
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getOrderDataHttpRequestResponse) => {
                            // Comprobación
                            // console.log('getOrderDataSideEffect - getOrderDataHttpRequestResponse:');
                            // console.log(getOrderDataHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                OrderActions.GetOrderDataEndSuccess({
                                    orderDataProductsAddressAndPaymentMethodPayload:
                                        getOrderDataHttpRequestResponse,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getOrderDataSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                OrderActions.GetOrderDataEndFailure({
                                    getOrderDataErrorMessagePayload:
                                        'There was an error when loading the Order data.',
                                }),
                            );
                        }),
                    );

                // Como siempre hay que devolver una Action, devuelvo una DummyAction
                return of(OrderActions.DummyAction());
            }),
        ),
    );

    // Side Effect de la Save Order Start Action de Order
    saveOrderStartSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(OrderActions.SaveOrderStart),

            withLatestFrom(this.store.select('orderReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((saveOrderStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: saveOrderStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('saveOrderStartActionData:');
                // console.log(saveOrderStartActionData);

                // Comprobacion
                // console.log('saveOrderStartSideEffect:');
                // console.log('authToken: ' + this.cookiesService.leerUnaCookie( "authToken" ));
                // console.log('orderFullDate: ' + saveOrderStartActionData[0].orderFullDatePayload);
                // console.log('deliveryFullDate: ' + saveOrderStartActionData[0].deliveryFullDatePayload);
                // console.log('addressId: ' + saveOrderStartActionData[0].addressIdPayload);
                // console.log('paymentMethodId: ' + saveOrderStartActionData[0].paymentMethodIdPayload);
                // console.log('orderProductsData: ');
                // console.log(saveOrderStartActionData[0].orderProductsDataPayload);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .saveOrderHttpRequest(
                        this.cookiesService.leerUnaCookie('authToken'),
                        saveOrderStartActionData[0].orderFullDatePayload,
                        saveOrderStartActionData[0].deliveryFullDatePayload,
                        saveOrderStartActionData[0].addressIdPayload,
                        saveOrderStartActionData[0].paymentMethodIdPayload,
                        saveOrderStartActionData[0].orderProductsDataPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((saveOrderDataHttpRequestResponse) => {
                            // Comprobación
                            // console.log('saveOrderStartSideEffect - saveOrderDataHttpRequestResponse:');
                            // console.log(saveOrderDataHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            // Si el guardar la nueva Order ha ido bien
                            if (saveOrderDataHttpRequestResponse) {
                                return of(
                                    // Procesar datos si es necesario...

                                    // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                    OrderActions.SaveOrderEndSuccess(),
                                );
                            } else {
                                return of(
                                    OrderActions.SaveOrderEndFailure({
                                        saveOrderDataErrorMessagePayload:
                                            'There was an error when saving the Order.',
                                    }),
                                );
                            }
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('saveOrderStartSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                OrderActions.SaveOrderEndFailure({
                                    saveOrderDataErrorMessagePayload:
                                        'There was an error when saving the Order.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Save Order End Success Action de Order
    saveOrderEndSuccessSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(OrderActions.SaveOrderEndSuccess),

            tap(() => {
                // Redirección
                // Nota: podría pasar la ruta a la que quiero ir como un Payload de la Action
                this.router.navigate(['/checkout/order-confirmation']);
            }),
            map(() => CartActions.DeleteCartData()),
        ),
    );
}
