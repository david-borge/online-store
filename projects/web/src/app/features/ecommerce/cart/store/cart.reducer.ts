// /*** cartReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as CartActions from "./cart.actions";  // Importar todo y guardarlo en el alias CartActions

import { GetCartDataPHPInterface } from "projects/web/src/app/core/models/GetCartDataPHP.interface";



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface CartReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  numberOfImagesInThisPage: number;
  numberOfImagesInThisPageLoaded: number;
  cartPageImagesLoaded: boolean;
  cartPagePreviouslyVisited: boolean;
  cartData: GetCartDataPHPInterface["cartData"];
  getCartDataErrorMessage: string;
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
  cartData: [],
  /* // Ejemplo
  cartData: [
    {
      productId       : 0,
      productQuantity : 33,
      name            : 'Product name',
      price           : 78.99,
      imageThumbnail  : '/assets/img/products/dualsense-wireless-controller-thumbnail',
      imageWidth      : '326',
      imageHeight     : '305',
    },
    {
      productId       : 0,
      productQuantity : 2,
      name            : 'Product name 2',
      price           : 69.99,
      imageThumbnail  : '/assets/img/products/good-kid-maad-city-thumbnail',
      imageWidth      : '348',
      imageHeight     : '348',
    },
  ], */
  getCartDataErrorMessage: '',
}



export const cartReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    /** Increment In One The Number Of Images In This Page Action **/
    on(CartActions.IncrementInOneTheNumberOfImagesInThisPage,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
          
      })),



    /** Increment In One The Number Of Images In This Page Loaded Action **/
    on(CartActions.IncrementInOneTheNumberOfImagesInThisPageLoaded,
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


    
    /** Get Cart Data Start Action **/
    // Side Effects asociados: getCartDataSideEffect (coger el Cart data del usuario actual desde la base de datos mediante un HTTP Request)
    on(CartActions.GetCartDataStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get Cart Data End Success Action **/
    on(CartActions.GetCartDataEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        cartData: action.cartDataPayload,
        
      })),

    /** |-> Get Cart Data End Failure Action **/
    on(CartActions.GetCartDataEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        getCartDataErrorMessage: action.getCartDataErrorMessagePayload,

      })),


      
);