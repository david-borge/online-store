// /*** globalReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as GlobalActions from "./global.actions";  // Importar todo y guardarlo en el alias GlobalActions



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface GlobalReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  firstVisitedPage: string;
  lastActiveMainPage: string;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: GlobalReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  firstVisitedPage: '',
  lastActiveMainPage: '',
}



export const globalReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    /** Set First Visited Page Action **/
    on(GlobalActions.SetFirstVisitedPage,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        firstVisitedPage: action.visitedPageURLPayload,
          
      })),



    /** Set Last Active Main Page Action **/
    on(GlobalActions.SetLastActiveMainPage,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        lastActiveMainPage: action.lastActiveMainPagePayload,
          
      })),

);