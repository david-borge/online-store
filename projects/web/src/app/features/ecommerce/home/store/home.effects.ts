/*** HomeEffects ***/

import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { GetCurrentProductReviewsPHPInterface } from 'projects/web/src/app/core/models/getCurrentProductReviewsPHP.interface';
import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

import * as fromApp from '../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

import * as HomeActions from './home.actions';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class HomeEffects {
    private actionsObservable = inject(Actions);
    private dataStorageService = inject(DataStorageService);
    private store = inject<Store<fromApp.AppState>>(Store);

    // Side Effect de la Get All Products Start Action de Home
    getAllProductsSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(HomeActions.GetAllProductsStart),

            withLatestFrom(this.store.select('homeReducerObservable')), // MUCHO CUIDADO: SÓLO hacer la llamada HTTP si aún no hay ningún producto en la Store, así nos evitamos hacer una llamada HTTP cada ver que se vuelva a la Home desde otra ruta

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getAllProductsStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getAllProductsStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getAllProductsStartActionData:');
                // console.log(getAllProductsStartActionData);
                // console.log('getAllProductsStartActionData[1].allProducts.length: ' + getAllProductsStartActionData[1].allProducts.length);

                // MUCHO CUIDADO: SÓLO hacer la llamada HTTP si aún no hay ningún producto en la Store, así nos evitamos hacer una llamada HTTP cada ver que se vuelva a la Home desde otra ruta
                if (getAllProductsStartActionData[1].allProducts.length === 0) {
                    // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                    return this.dataStorageService.getAllProductsHttpRequest().pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                        debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                        Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getAllProductsData) => {
                            // Comprobación
                            // console.log('getAllProductsSideEffect - getAllProductsData:');
                            // console.log(getAllProductsData);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                HomeActions.GetAllProductsEndSuccess({
                                    allProductsPayload: getAllProductsData,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('deleteAllCarsSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                HomeActions.GetAllProductsEndFailure({
                                    getAllProductsErrorMessagePayload:
                                        'There was an error when loading the products.',
                                }),
                            );
                        }),
                    );
                }

                // Como siempre hay que devolver una Action, devuelvo una DummyAction si los productos ya están cargados en la Store
                return of(HomeActions.DummyAction());
            }),
        ),
    );

    // Side Effect de la Get Current Product Reviews Start Action de Home
    getCurrentProductReviewsSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(HomeActions.GetCurrentProductReviewsStart),

            withLatestFrom(this.store.select('homeReducerObservable')), // MUCHO CUIDADO: SÓLO hacer la llamada HTTP si aún no hay ningún producto en la Store, así nos evitamos hacer una llamada HTTP cada ver que se vuelva a la Home desde otra ruta

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getCurrentProductReviewsStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getCurrentProductReviewsStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getCurrentProductReviewsStartActionData:');
                // console.log(getCurrentProductReviewsStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .getCurrentProductReviewsHttpRequest(
                        getCurrentProductReviewsStartActionData[0].currentProductSlugPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap(
                            (
                                getCurrentProductReviewsResponse: GetCurrentProductReviewsPHPInterface[],
                            ) => {
                                // Comprobación
                                // console.log('getCurrentProductReviewsSideEffect - getCurrentProductReviewsResponse:');
                                // console.log(getCurrentProductReviewsResponse);

                                // Procesamiento de datos si es necesario...

                                return of(
                                    // Procesar datos si es necesario...

                                    // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                    HomeActions.GetCurrentProductReviewsEndSuccess({
                                        currentProductReviewsPayload:
                                            getCurrentProductReviewsResponse,
                                    }),
                                );
                            },
                        ),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getCurrentProductReviewsSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                HomeActions.GetCurrentProductReviewsEndFailure({
                                    getCurrentProductReviewsErrorMessagePayload:
                                        "There was an error when loading this product's reviews.",
                                }),
                            );
                        }),
                    );
            }),
        ),
    );
}
