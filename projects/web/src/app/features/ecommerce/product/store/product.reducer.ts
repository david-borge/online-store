// /*** productReducer ***/

import { createReducer, on } from '@ngrx/store';

import * as ProductActions from './product.actions'; // Importar todo y guardarlo en el alias ProductActions

// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface ProductReducerStateInterface {
    // loadStatus: ProcessStatusInterface['processStatus'];
    numberOfImagesInThisPage: number;
    numberOfImagesInThisPageLoaded: number;
    productPageImagesLoaded: boolean;
    productPagePreviouslyVisited: boolean;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: ProductReducerStateInterface = {
    // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
    // loadStatus: 'NOT_STARTED',
    numberOfImagesInThisPage: 0,
    numberOfImagesInThisPageLoaded: 0,
    productPageImagesLoaded: false,
    productPagePreviouslyVisited: false,
};

export const productReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.

    /** Increment In One The Number Of Images In This Page Action **/
    on(ProductActions.IncrementInOneTheNumberOfImagesInThisPage, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
    })),

    /** Increment In One The Number Of Images In This Page Loaded Action **/
    on(ProductActions.IncrementInOneTheNumberOfImagesInThisPageLoaded, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPageLoaded: state.numberOfImagesInThisPageLoaded + 1,
    })),

    /** Set Product Page Has Been Previously Visited To True Action **/
    on(ProductActions.SetProductPageHasBeenPrevouslyVisitedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        productPagePreviouslyVisited: true,
    })),

    /** Set Product Page Images Loaded To True Action **/
    on(ProductActions.SetProductPageImagesLoadedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        productPageImagesLoaded: true,
    })),
);
