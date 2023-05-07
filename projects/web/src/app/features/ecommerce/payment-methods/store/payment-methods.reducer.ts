// /*** paymentMethodsReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as PaymentMethodsActions from "./payment-methods.actions";  // Importar todo y guardarlo en el alias PaymentMethodsActions

import { GetPaymentMethodsPHPInterface } from "projects/web/src/app/core/models/getPaymentMethodsPHP.interface";




// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface PaymentMethodsReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  paymentMethods: GetPaymentMethodsPHPInterface['paymentMethods'];
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: PaymentMethodsReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  paymentMethods: [],
}



export const paymentMethodsReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.


    
    /** Get PaymentMethods Start Action **/
    // Side Effects asociados: getPaymentMethodsSideEffect (toma los datos de la PaymentMethods desde la base de datos mediante un HTTP Request)
    on(PaymentMethodsActions.GetPaymentMethodsStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get PaymentMethods End Success Action **/
    on(PaymentMethodsActions.GetPaymentMethodsEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        paymentMethods: action.paymentMethodsPayload,
        
      })),

    /** |-> Get PaymentMethods End Failure Action **/
    on(PaymentMethodsActions.GetPaymentMethodsEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),



);