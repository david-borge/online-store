// /*** loadingScreenReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as LoadingScreenActions from "./loading-screen.actions";  // Importar todo y guardarlo en el alias LoadingScreenActions



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface LoadingScreenReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  numberOfImagesInThisPage: number;
  numberOfImagesInThisPageLoaded: number;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: LoadingScreenReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  numberOfImagesInThisPage: 0,
  numberOfImagesInThisPageLoaded: 0,
}



export const loadingScreenReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    // /** Set Home Page Has Been Previously Visited Action **/
    // on(LoadingScreenActions.SetHomePageHasBeenPrevouslyVisited,
    //   (state, action) => ({

    //     /* Añadir un valor */
    //     // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

    //     // Copiamos el App State (inicial) (en todas las propiedades de state)
    //     ...state,

    //     homePagePreviouslyVisited: true,
          
    //   })),

);