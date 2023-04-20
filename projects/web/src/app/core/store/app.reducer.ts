/*** appReducer ***/
// Agrupa todos los Reducers de la aplicación
/* Un Reducer es una función JS, que recibe como input:
    · El App State actual (o inicial) (desde la Store central),
    · La Action que queremos ejecutar.
    Los Reducers solo pueden ejecutar código síncrono, por lo que no se puede hacer una HTTP Request desde un Reducer, eso se hace en las Action. */



import { ActionReducerMap } from '@ngrx/store';

import * as fromHome from '../../features/ecommerce/home/pages/home/store/home.reducer';



// App State (inicial) - Tipos (definidos en una interfaz)
// Cojo los tipos de las interfaces de los demás Reducers
export interface AppState {
    homeReducerObservable: fromHome.HomeReducerStateInterface;
}


// Action Reducer Map
// Un objeto JS con la lista de Reducers de la app ({identificadorQueQuiera: MiReducerAsociadoAlIdentificador})
export const appReducer: ActionReducerMap<AppState> = {
    homeReducerObservable: fromHome.homeReducer,
};