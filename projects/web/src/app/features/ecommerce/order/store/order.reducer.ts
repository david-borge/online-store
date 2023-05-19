// /*** orderReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as OrderActions from "./order.actions";  // Importar todo y guardarlo en el alias OrderActions

import { GetOrderDataPHPInterface } from "projects/web/src/app/core/models/getOrderDataPHP.interface";



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface OrderReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  currentOrderNumber : number;
  orderData          : GetOrderDataPHPInterface["orderData"];
  // orderTotal         : number;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: OrderReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  currentOrderNumber : 0,
  orderData          : {} as GetOrderDataPHPInterface["orderData"],
  // orderTotal         : 0,
}



export const orderReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.


      
    /** Save Current Product Slug Action **/
    on(OrderActions.SaveCurrentOrderSlug,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        currentOrderNumber: action.currentOrderSlugPayload,
          
      })),


    
    /** Get Order Data Start Action **/
    // Side Effects asociados: getOrderDataSideEffect (toma los datos de la Order desde la base de datos mediante un HTTP Request)
    on(OrderActions.GetOrderDataStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get Order Data End Success Action **/
    on(OrderActions.GetOrderDataEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        orderData          : action.orderDataProductsAddressAndPaymentMethodPayload.orderData,
        orderProducts      : action.orderDataProductsAddressAndPaymentMethodPayload.orderProducts,
        orderAddress       : action.orderDataProductsAddressAndPaymentMethodPayload.orderAddress,
        orderPaymentMethod : action.orderDataProductsAddressAndPaymentMethodPayload.orderPaymentMethod,
        
      })),

    /** |-> Get Order Data End Failure Action **/
    on(OrderActions.GetOrderDataEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),


    
    /** Save Order Start Action **/
    // Side Effects asociados: saveOrderStartSideEffect (toma los datos de la Order desde la base de datos mediante un HTTP Request)
    on(OrderActions.SaveOrderStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Save Order End Success Action **/
    on(OrderActions.SaveOrderEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
        
      })),

    /** |-> Save Order End Failure Action **/
    on(OrderActions.SaveOrderEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),



);