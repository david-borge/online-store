/*** LoadingScreenEffects ***/

import { Injectable } from '@angular/core';

// import { Store } from "@ngrx/store";
// import { Actions, createEffect, ofType } from '@ngrx/effects';

// import { catchError, switchMap, withLatestFrom } from 'rxjs/operators'
// import { of } from 'rxjs';

// import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class LoadingScreenEffects {
    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action

    constructor() {
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        // private actionsObservable: Actions,
        // private store: Store<fromApp.AppState>,
    }
}
