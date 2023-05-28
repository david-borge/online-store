// /*** cartReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as CartActions from "./cart.actions";  // Importar todo y guardarlo en el alias CartActions

import { GetCartDataPHPInterface } from "projects/web/src/app/core/models/GetCartDataPHP.interface";
import { ProductInterface } from "projects/web/src/app/core/models/product.interface";
import { CartInterface } from "projects/web/src/app/core/models/cart.interface";



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface CartReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  numberOfImagesInThisPage: number;
  numberOfImagesInThisPageLoaded: number;
  cartPageImagesLoaded: boolean;
  cartPagePreviouslyVisited: boolean;
  cartData: GetCartDataPHPInterface["cartData"];
  getCartDataErrorMessage: string;
  updateProductQuantityErrorMessage: string;
  newProductSlug: ProductInterface["id"];
  newProductQuantity: CartInterface["productQuantity"];
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
  updateProductQuantityErrorMessage: '',
  newProductSlug: 0,
  newProductQuantity: 0,
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


    
    /** Update Product Quantity Start Action **/
    // Side Effects asociados: updateProductQuantitySideEffect (actualizar productQuantity del productId y userId correspondiente en la base de datos mediante un HTTP Request)
    on(CartActions.UpdateProductQuantityStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Update Product Quantity End Success Action **/
    on(CartActions.UpdateProductQuantityEndSuccess, (state, action) => {

      /* Editar un valor de un objeto que está dentro de un array (OpenAI Generated Code) */
      
      // Make a copy of the cartData array
      const updatedCartData = [...state.cartData];

      // Update the product quantity of the item at the specified index
      updatedCartData[action.cartDataArrayIdPayload] = {
        ...updatedCartData[action.cartDataArrayIdPayload],
        productQuantity: action.productQuantityPayload,
      };
      
      // Return the updated state
      return {
        ...state,
        cartData: updatedCartData,
      };

    }),

    /** |-> Update Product Quantity End Failure Action **/
    on(CartActions.UpdateProductQuantityEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        updateProductQuantityErrorMessage: action.updateProductQuantityErrorMessagePayload,

      })),


    
    /** Delete Product From Cart Start Action **/
    // Side Effects asociados: deleteProductFromCartSideEffect (borrar la fila de la tabla cart con el productId y userId correspondiente de la base de datos mediante un HTTP Request)
    on(CartActions.DeleteProductFromCartStart,
      (state, action) => {

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Nota: normalmente borraría el valor del Cart Store en la acción DeleteProductFromCartEndSuccess, pero lo hago aquí, antes del HTTP Request, para evitar el retraso a nivel de interfaz de usuario.
        /** Borrar un valor **/
        /** CUIDADO: al usar return hay que omitir los paréntesis después de => **/
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).
        return {

          // Copiamos el App State (inicial) (en todas las propiedades de state)
          ...state,

          cartData: state.cartData.filter(
            // Filter es una función de JS que devuelve un array, así que cumplimos con la regla de no editar el state original
            // Filter ejecuta una función en cada elemento del array. Si la función devuelve true, ese elemento será parte del array que devuelve.
            (item, itemIndex) => {

              return (itemIndex !== action.cartDataArrayIdPayload);  // action.cartDataArrayIdPayload es el índice del item que voy a borrar

            }
          ),

        };
          
      }),

    /** |-> Delete Product From Cart End Success Action **/
    on(CartActions.DeleteProductFromCartEndSuccess, (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

      })),

    /** |-> Delete Product From Cart End Failure Action **/
    on(CartActions.DeleteProductFromCartEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        deleteProductFromCartErrorMessagePayload: action.deleteProductFromCartErrorMessagePayload,

      })),


    
    /** Add Product To Cart Start Action **/
    // Side Effects asociados: addProductToCartSideEffect (borrar la fila de la tabla cart con el productId y userId correspondiente de la base de datos mediante un HTTP Request)
    on(CartActions.AddProductToCartStart,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Add Product To Cart End Success Action **/
    on(CartActions.AddProductToCartEndSuccess, (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // cartData: [
        //   ...state.cartData,
        //   action.newProductDataPayload,
        // ],

      })),

    /** |-> Add Product To Cart End Failure Action **/
    on(CartActions.AddProductToCartEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        addProductToCartErrorMessagePayload: action.addProductToCartErrorMessagePayload,

      })),



    /** Log Out Action **/
    // Log Out: Borrar datos de la Cart Store (cartData, getCartDataErrorMessage, updateProductQuantityErrorMessage, newProductSlug, newProductQuantity)
    on(CartActions.LogOut,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        cartData: [],
        getCartDataErrorMessage: '',
        updateProductQuantityErrorMessage: '',
        newProductSlug: 0,
        newProductQuantity: 0,
        
      })),


      
);