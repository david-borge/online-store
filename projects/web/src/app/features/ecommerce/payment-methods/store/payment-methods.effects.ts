/*** PaymentMethodEffects ***/

import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { CookiesService } from 'projects/web/src/app/core/services/cookies/cookies.service';
import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

import * as fromApp from '../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../../core/store/global.actions';

import * as PaymentMethodsActions from './payment-methods.actions';


@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class PaymentMethodEffects {
    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action

    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        private dataStorageService: DataStorageService,
        private store: Store<fromApp.AppState>,
        private cookiesService: CookiesService,
    ) {}

    // Side Effect de la Get PaymentMethod Start Action de PaymentMethods
    getPaymentMethodsSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(PaymentMethodsActions.GetPaymentMethodsStart),

            withLatestFrom(this.store.select('paymentMethodsReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getPaymentMethodsStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getPaymentMethodsStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getPaymentMethodsStartActionData:');
                // console.log(getPaymentMethodsStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .getPaymentMethodsHttpRequest(this.cookiesService.leerUnaCookie('authToken'))
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getPaymentMethodsHttpRequestResponse) => {
                            // Comprobación
                            // console.log('getPaymentMethodsSideEffect - getPaymentMethodsHttpRequestResponse:');
                            // console.log(getPaymentMethodsHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                PaymentMethodsActions.GetPaymentMethodsEndSuccess({
                                    paymentMethodsPayload:
                                        getPaymentMethodsHttpRequestResponse.paymentMethods,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getPaymentMethodsSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                PaymentMethodsActions.GetPaymentMethodsEndFailure({
                                    getPaymentMethodsErrorMessagePayload:
                                        'There was an error when loading the PaymentMethod data.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Add New Card Start Action de PaymentMethods
    addNewCardSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(PaymentMethodsActions.AddNewCardStart),

            withLatestFrom(this.store.select('paymentMethodsReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((addNewCardStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: addNewCardStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('addNewCardStartActionData:');
                // console.log(addNewCardStartActionData);

                // console.log('authTokenCookieValue: ' + this.cookiesService.leerUnaCookie('authToken'));

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .addNewCardHttpRequest(
                        addNewCardStartActionData[0].newCardPayload,
                        this.cookiesService.leerUnaCookie('authToken'),
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((addNewCardHttpRequestResponse) => {
                            // Comprobación
                            // console.log('addNewCardSideEffect - addNewCardHttpRequestResponse:');
                            // console.log(addNewCardHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                PaymentMethodsActions.AddNewCardEndSuccess({
                                    newCardId: addNewCardHttpRequestResponse,
                                    newCardPayload: addNewCardStartActionData[0].newCardPayload,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('addNewCardSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                PaymentMethodsActions.AddNewCardEndFailure({
                                    addNewCardErrorMessagePayload:
                                        'There was an error when loading the Country list.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Add New Card End Success Action de PaymentMethods
    addNewCardEndSuccessSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            ofType(PaymentMethodsActions.AddNewCardEndSuccess),
            map(() => {
                return GlobalActions.ShowOrHideBottomOverlay({ showBottomOverlayValue: false });
            }),
        ),
    );

    // Side Effect de la Change Default Payment Method Start Action de PaymentMethods
    changeDefaultPaymentMethodSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(PaymentMethodsActions.ChangeDefaultPaymentMethodStart),

            withLatestFrom(this.store.select('paymentMethodsReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((changeDefaultPaymentMethodActionData) => {
                // Aquí puedo usar los datos del payload de la Action: changeDefaultPaymentMethodActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('changeDefaultPaymentMethodActionData:');
                // console.log(changeDefaultPaymentMethodActionData);

                // console.log('authTokenCookieValue: ' + this.cookiesService.leerUnaCookie('authToken'));

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .changeDefaultPaymentMethod(
                        this.cookiesService.leerUnaCookie('authToken'),
                        changeDefaultPaymentMethodActionData[0].paymentMethodIdPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((changeDefaultPaymentMethodHttpRequestResponse) => {
                            // Comprobación
                            // console.log('changeDefaultPaymentMethodSideEffect - changeDefaultPaymentMethodHttpRequestResponse:');
                            // console.log(changeDefaultPaymentMethodHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                PaymentMethodsActions.ChangeDefaultPaymentMethodEndSuccess({
                                    paymentMethodArrayIdPayload:
                                        changeDefaultPaymentMethodActionData[0]
                                            .paymentMethodArrayIdPayload,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('changeDefaultPaymentMethodSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                PaymentMethodsActions.ChangeDefaultPaymentMethodEndFailure({
                                    changeDefaultPaymentMethodErrorMessagePayload:
                                        'There was an error when changing the selected payment method.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );
}
