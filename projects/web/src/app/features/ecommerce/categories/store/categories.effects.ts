/*** CategoriesEffects ***/

import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

import * as fromApp from '../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

import * as CategoriesActions from './categories.actions';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class CategoriesEffects {
    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action

    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        private dataStorageService: DataStorageService,
        private store: Store<fromApp.AppState>,
    ) {}

    // Side Effect de la Nombre Action Action de Categories
    getAllCategoriesSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(CategoriesActions.GetAllCategoriesStart),

            withLatestFrom(this.store.select('categoriesReducerObservable')), // MUCHO CUIDADO: SÓLO hacer la llamada HTTP si aún no hay ningún producto en la Store, así nos evitamos hacer una llamada HTTP cada ver que se vuelva a la Home desde otra ruta

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getAllCategoriesStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getAllCategoriesStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getAllCategoriesStartActionData:');
                // console.log(getAllCategoriesStartActionData);

                // MUCHO CUIDADO: SÓLO hacer la llamada HTTP si aún no hay ningún producto en la Store, así nos evitamos hacer una llamada HTTP cada ver que se vuelva a la Home desde otra ruta
                if (getAllCategoriesStartActionData[1].allCategories.length === 0) {
                    // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                    return this.dataStorageService.getAllCategoriesHttpRequest().pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                        debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                        Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((resData) => {
                            // Comprobación
                            // console.log('getAllCategoriesSideEffect - resData:');
                            // console.log(resData);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                CategoriesActions.GetAllCategoriesEndSuccess({
                                    allCategoriesPayload: resData,
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
                                CategoriesActions.GetAllCategoriesEndFailure({
                                    getAllCategoriesErrorMessagePayload:
                                        'There was an error when loading the categories.',
                                }),
                            );
                        }),
                    );
                }

                // Como siempre hay que devolver una Action, devuelvo una DummyAction si los productos ya están cargados en la Store
                return of(CategoriesActions.DummyAction());
            }),
        ),
    );
}
