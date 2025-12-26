// /*** homeReducer ***/

import { createReducer, on } from '@ngrx/store';

import { GetCurrentProductReviewsPHPInterface } from 'projects/web/src/app/core/models/getCurrentProductReviewsPHP.interface';
import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as HomeActions from './home.actions'; // Importar todo y guardarlo en el alias HomeActions


// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface HomeReducerStateInterface {
    // loadStatus: ProcessStatus;
    allProducts: ProductInterface[];
    currentProductSlug: ProductInterface['slug'];
    numberOfImagesInThisPage: number;
    numberOfImagesInThisPageLoaded: number;
    homePageImagesLoaded: boolean;
    homePagePreviouslyVisited: boolean;
    currentProductReviews: GetCurrentProductReviewsPHPInterface[];
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: HomeReducerStateInterface = {
    // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
    // loadStatus: ProcessStatus.NOT_STARTED,
    allProducts: [],
    currentProductSlug: '',
    numberOfImagesInThisPage: 0,
    numberOfImagesInThisPageLoaded: 0,
    homePageImagesLoaded: false,
    homePagePreviouslyVisited: false,
    currentProductReviews: [],
    /* // Ejemplo:
  currentProductReviews: [
    {
      title               : 'Review 1 Title',
      starsWidth          : 40,
      publicationFullDate : 'Sun May 21 2023 12:22:50 GMT+0200 (Central European Summer Time)',
      content             : 'Review 1 content. Review 1 content. Review 1 content. Review 1 content. Review 1 content. Review 1 content.',
      fullName            : 'Full Name 1',
    },
    {
      title               : 'Review 2 Title',
      starsWidth          : 85,
      publicationFullDate : 'Sun Jan 13 2023 12:22:50 GMT+0200 (Central European Summer Time)',
      content             : 'Review 2 content. Review 2 content. Review 2 content. Review 2 content. Review 2 content. Review 2 content.',
      fullName            : 'Full Name 2',
    },
  ], */
};

export const homeReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.

    /** Get All Products Start Action **/
    // Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
    on(HomeActions.GetAllProductsStart, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** |-> Get All Products End Success Action **/
    on(HomeActions.GetAllProductsEndSuccess, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        allProducts: [
            // Cuidado: NO hay que copiar los products en este caso porque los estoy cargando todos desde la base de datos

            // Añadir un valor a un array - Si lo que devuelve esta Action SÍ es un array
            ...action.allProductsPayload,
        ],
    })),

    /** |-> Get All Products End Failure Action **/
    on(HomeActions.GetAllProductsEndFailure, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** Save Current Product Slug Action **/
    on(HomeActions.SaveCurrentProductSlug, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        currentProductSlug: action.currentProductSlugPayload,
    })),

    /** Increment In One The Number Of Images In This Page Action **/
    on(HomeActions.IncrementInOneTheNumberOfImagesInThisPage, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
    })),

    /** Increment In One The Number Of Images In This Page Loaded Action **/
    on(HomeActions.IncrementInOneTheNumberOfImagesInThisPageLoaded, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPageLoaded: state.numberOfImagesInThisPageLoaded + 1,
    })),

    /** Set Home Page Has Been Previously Visited To True Action **/
    on(HomeActions.SetHomePageHasBeenPrevouslyVisitedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        homePagePreviouslyVisited: true,
    })),

    /** Set Home Page Images Loaded To True Action **/
    on(HomeActions.SetHomePageImagesLoadedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        homePageImagesLoaded: true,
    })),

    /** Get Current Product Reviews Start Action **/
    // Side Effects asociados: getCurrentProductReviewsSideEffect (toma todos las Reviews de un Product desde la base de datos mediante un HTTP Request)
    on(HomeActions.GetCurrentProductReviewsStart, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** |-> Get Current Product Reviews End Success Action **/
    on(HomeActions.GetCurrentProductReviewsEndSuccess, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        currentProductReviews: action.currentProductReviewsPayload,
    })),

    /** |-> Get Current Product Reviews End Failure Action **/
    on(HomeActions.GetCurrentProductReviewsEndFailure, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),
);
