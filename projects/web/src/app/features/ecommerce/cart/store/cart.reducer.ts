// /*** cartReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as CartActions from "./cart.actions";  // Importar todo y guardarlo en el alias CartActions



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface CartReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  numberOfImagesInThisPage: number;
  numberOfImagesInThisPageLoaded: number;
  cartPageImagesLoaded: boolean;
  cartPagePreviouslyVisited: boolean;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: CartReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  numberOfImagesInThisPage: 0,
  numberOfImagesInThisPageLoaded: 0,
  cartPageImagesLoaded: false,
  cartPagePreviouslyVisited: false,
}



export const cartReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    /** Count Images In This Page Action **/
    on(CartActions.CountImagesInThisPage,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
          
      })),



    /** Count Images Loaded In This Page Action **/
    on(CartActions.CountImagesInThisPageLoaded,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPageLoaded: state.numberOfImagesInThisPageLoaded + 1,
          
      })),



    /** Set Cart Page Has Been Previously Visited To True Action **/
    on(CartActions.SetCartPageHasBeenPrevouslyVisitedToTrue,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        cartPagePreviouslyVisited: true,
          
      })),



    /** Set Cart Page Images Loaded To True Action **/
    on(CartActions.SetCartPageImagesLoadedToTrue,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        cartPageImagesLoaded: true,
          
      })),
);