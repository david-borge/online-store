/*** GlobalEffects ***/



import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs';

import * as GlobalActions from './global.actions';




@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class GlobalEffects {

    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action
    
    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    ) { }



    // Side Effect de la Set Local Storage Key Value Action de Global
    setLocalStorageKeyValueSideEffect = createEffect(() => this.actionsObservable.pipe(  // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

        // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
        // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
        ofType(GlobalActions.SetLocalStorageKeyValue),

        // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
        switchMap( (setLocalStorageKeyValueActionData) => {

            // Aquí puedo usar los datos del payload de la Action: setLocalStorageKeyValueActionData.nombrePayloadPayload.propiedad1

            // Comprobacion
            // console.log('setLocalStorageKeyValueActionData:');
            // console.log(setLocalStorageKeyValueActionData);

            // Guardar lastActiveMainPage en LocalStorage
            if (isPlatformBrowser(this.platformId)) { // Si estoy en el navegador (protección para SSR)
                window.localStorage.setItem(setLocalStorageKeyValueActionData.localStorageKeyPayload, setLocalStorageKeyValueActionData.localStorageValuePayload);
            }

            // Como siempre hay que devolver una Action, devuelvo una DummyAction si los productos ya están cargados en la Store
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

                // Comprobacion
                // console.log('getLocalStorageValueActionData:');
                // console.log(getLocalStorageValueActionData);

                // Guardar lastActiveMainPage en LocalStorage
                return of( GlobalActions.GetLocalStorageValueEnd({
                    localStorageKeyPayload: getLocalStorageValueActionData.localStorageKeyPayload,
                    localStorageValuePayload: window.localStorage.getItem(getLocalStorageValueActionData.localStorageKeyPayload),
                }) );

            }

            return of(); // Esto es solo para que no de errores al poner: if (isPlatformBrowser(this.platformId))
                
        }),

    ));

}