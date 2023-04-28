// /*** homeReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as HomeActions from "./home.actions";  // Importar todo y guardarlo en el alias HomeActions

import { ProductInterface } from "projects/web/src/app/core/models/product.interface";



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface HomeReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  allProducts: ProductInterface[];
  currentProductSlug: string;
  numberOfImagesInThisPage: number;
  numberOfImagesInThisPageLoaded: number;
  homePageImagesLoaded: boolean;
  homePagePreviouslyVisited: boolean;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: HomeReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  allProducts: [],
  currentProductSlug: '',
  numberOfImagesInThisPage: 0,
  numberOfImagesInThisPageLoaded: 0,
  homePageImagesLoaded: false,
  homePagePreviouslyVisited: false,
}



export const homeReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    /** Get All Products Start Action **/
    // Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
    on(HomeActions.GetAllProductsStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get All Products End Success Action **/
    on(HomeActions.GetAllProductsEndSuccess,
      (state, action) => ({

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
    on(HomeActions.GetAllProductsEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),



    /** Save Current Product Slug Action **/
    on(HomeActions.SaveCurrentProductSlug,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        currentProductSlug: action.currentProductSlugPayload,
          
      })),



    /** Count Images In This Page Action **/
    on(HomeActions.CountImagesInThisPage,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
          
      })),



    /** Count Images Loaded In This Page Action **/
    on(HomeActions.CountImagesInThisPageLoaded,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPageLoaded: state.numberOfImagesInThisPageLoaded + 1,
          
      })),



    /** Set Home Page Has Been Previously Visited To True Action **/
    on(HomeActions.SetHomePageHasBeenPrevouslyVisitedToTrue,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        homePagePreviouslyVisited: true,
          
      })),



    /** Set Home Page Images Loaded To True Action **/
    on(HomeActions.SetHomePageImagesLoadedToTrue,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        homePageImagesLoaded: true,
          
      })),

);