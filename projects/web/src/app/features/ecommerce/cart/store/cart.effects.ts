/*** CartEffects ***/

import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import { CookiesService } from '@core/services/cookies/cookies.service';
import { DataStorageService } from '@core/services/data-storage/data-storage.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

import * as CartActions from './cart.actions';

// import { GetCartDataPHPInterface }from '@core/models/GetCartDataPHP.interface';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class CartEffects {
    private actionsObservable = inject(Actions);
    private store = inject<Store<fromApp.AppState>>(Store);
    private dataStorageService = inject(DataStorageService);
    private cookiesService = inject(CookiesService);
    private authService = inject(AuthService);

    // Side Effect de la Get All Countries Start Action de Cart
    getCartDataSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(CartActions.GetCartDataStart),

            withLatestFrom(this.store.select('cartReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((_getCartDataStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getCartDataStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getCartDataStartActionData:');
                // console.log(getCartDataStartActionData);

                // Solo hacer la HTTP Request si un usuario ha iniciado sesión
                if (this.cookiesService.leerUnaCookie('authToken')) {
                    // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                    return this.dataStorageService
                        .getCartDataHttpRequest(this.cookiesService.leerUnaCookie('authToken'))
                        .pipe(
                            /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                        debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                        Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                            switchMap((getCartDataHttpRequestResponse) => {
                                // Comprobación
                                // console.log('getCartDataSideEffect - getCartDataHttpRequestResponse:');
                                // console.log(getCartDataHttpRequestResponse);

                                // Procesamiento de datos si es necesario...

                                return of(
                                    // Procesar datos si es necesario...

                                    // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                    CartActions.GetCartDataEndSuccess({
                                        cartDataPayload: getCartDataHttpRequestResponse,
                                    }),
                                );
                            }),
                            catchError((errorResponse) => {
                                // Error handling code...

                                // Mostrar el error en la consola
                                console.log('getCartDataSideEffect - errorResponse:');
                                console.log(errorResponse);

                                // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                                return of(
                                    CartActions.GetCartDataEndFailure({
                                        getCartDataErrorMessagePayload:
                                            'There was an error when loading the Country list.',
                                    }),
                                );
                            }),
                        );
                } else {
                    // Si el usuario no ha iniciado sesión, devolver un array vacío
                    return of(
                        CartActions.GetCartDataEndSuccess({
                            cartDataPayload: [],
                        }),
                    );
                }
            }),
        ),
    );

    // Side Effect de la Update Product Quantity Start Action de Cart
    updateProductQuantitySideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(CartActions.UpdateProductQuantityStart),

            withLatestFrom(this.store.select('cartReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((updateProductQuantityStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: updateProductQuantityStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('updateProductQuantityStartActionData:');
                // console.log(updateProductQuantityStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .updateProductQuantityHttpRequest(
                        this.cookiesService.leerUnaCookie('authToken'),
                        updateProductQuantityStartActionData[0].productIdPayload,
                        updateProductQuantityStartActionData[0].productQuantityPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((updateProductQuantityHttpRequestResponse: boolean) => {
                            // Comprobación
                            // console.log('updateProductQuantitySideEffect - updateProductQuantityHttpRequestResponse:');
                            // console.log(updateProductQuantityHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            if (updateProductQuantityHttpRequestResponse == true) {
                                return of(
                                    // Procesar datos si es necesario...

                                    // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                    CartActions.UpdateProductQuantityEndSuccess({
                                        cartDataArrayIdPayload:
                                            updateProductQuantityStartActionData[0]
                                                .cartDataArrayIdPayload,
                                        productQuantityPayload:
                                            updateProductQuantityStartActionData[0]
                                                .productQuantityPayload,
                                        productIdPayload:
                                            updateProductQuantityStartActionData[0]
                                                .productIdPayload,
                                    }),
                                );
                            } else {
                                return of(
                                    CartActions.UpdateProductQuantityEndFailure({
                                        updateProductQuantityErrorMessagePayload:
                                            'There was an error when loading the Country list.',
                                    }),
                                );
                            }
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('updateProductQuantitySideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                CartActions.UpdateProductQuantityEndFailure({
                                    updateProductQuantityErrorMessagePayload:
                                        'There was an error when loading the Country list.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Delete Product From Cart Start Action de Cart
    deleteProductFromCartSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(CartActions.DeleteProductFromCartStart),

            withLatestFrom(this.store.select('cartReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((deleteProductFromCartStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: deleteProductFromCartStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('deleteProductFromCartStartActionData:');
                // console.log(deleteProductFromCartStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .deleteProductFromCartHttpRequest(
                        this.cookiesService.leerUnaCookie('authToken'),
                        deleteProductFromCartStartActionData[0].productIdPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((deleteProductFromCartHttpRequestResponse: boolean) => {
                            // Comprobación
                            // console.log('deleteProductFromCartSideEffect - deleteProductFromCartHttpRequestResponse:');
                            // console.log(deleteProductFromCartHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            if (deleteProductFromCartHttpRequestResponse == true) {
                                return of(
                                    // Procesar datos si es necesario...

                                    // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                    CartActions.DeleteProductFromCartEndSuccess({
                                        cartDataArrayIdPayload:
                                            deleteProductFromCartStartActionData[0]
                                                .cartDataArrayIdPayload,
                                        productIdPayload:
                                            deleteProductFromCartStartActionData[0]
                                                .productIdPayload,
                                    }),
                                );
                            } else {
                                return of(
                                    CartActions.DeleteProductFromCartEndFailure({
                                        deleteProductFromCartErrorMessagePayload:
                                            'There was an error when loading the Country list.',
                                    }),
                                );
                            }
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('deleteProductFromCartSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                CartActions.DeleteProductFromCartEndFailure({
                                    deleteProductFromCartErrorMessagePayload:
                                        'There was an error when loading the Country list.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Add Product To Cart Start Action de Cart
    addProductToCartStartSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(CartActions.AddProductToCartStart),

            withLatestFrom(this.store.select('cartReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((addProductToCartStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: addProductToCartStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('addProductToCartStartActionData:');
                // console.log(addProductToCartStartActionData);

                // Si el usuario NO ha iniciado sesión, creo un authToken nuevo
                let authToken = this.cookiesService.leerUnaCookie('authToken');
                if (authToken == '') {
                    // Creo un authToken nuevo
                    this.authService.generateAuthTokenCookie(this.authService.generateToken()); // Token de autentificación aleatorio y guardarlo en la cookie authToken
                    this.authService.generateAuthExpirationDateCookie(); // Generar cookie authExpirationDate

                    // Leo el nuevo tooken
                    authToken = this.cookiesService.leerUnaCookie('authToken');
                }

                // Comprobacion
                // console.log('addProductToCartStartSideEffect > authToken: ' + authToken);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .addProductToCartHttpRequest(
                        authToken,
                        addProductToCartStartActionData[0].productSlugPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((_addProductToCartHttpRequestResponse: boolean) => {
                            // Comprobación
                            // console.log('addProductToCartSideEffect - addProductToCartHttpRequestResponse:');
                            // console.log(addProductToCartHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                CartActions.AddProductToCartEndSuccess(/* {
                                newProductDataPayload: addProductToCartHttpRequestResponse,
                            } */),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('addProductToCartSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                CartActions.AddProductToCartEndFailure({
                                    addProductToCartErrorMessagePayload:
                                        'There was an error when adding the product to the cart.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );
}
