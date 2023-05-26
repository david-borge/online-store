// /*** paymentMethodsReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as PaymentMethodsActions from "./payment-methods.actions";  // Importar todo y guardarlo en el alias PaymentMethodsActions

import { GetPaymentMethodsPHPInterface } from "projects/web/src/app/core/models/getPaymentMethodsPHP.interface";
import { PaymentMethodInterface } from "projects/web/src/app/core/models/paymentMethod.interface";




// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface PaymentMethodsReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  paymentMethods: GetPaymentMethodsPHPInterface['paymentMethods'];
  newCard: {
    type                : PaymentMethodInterface["type"],
    cardBankName        : PaymentMethodInterface["cardBankName"],
    cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
    cardNumber          : PaymentMethodInterface["cardNumber"],
    cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
    cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
    cardType            : PaymentMethodInterface["cardType"],
  };
  addNewCardErrorMessage: string;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: PaymentMethodsReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  paymentMethods: [],
  newCard: {
    type                : 'card',
    cardBankName        : 'Bank of America', // 'Bank of America' | 'Goldman Sachs' | 'Citigroup' | 'Wells Fargo' | 'Capital One Financial'
    cardPersonFullName  : '',
    cardNumber          : '',
    cardExpirationMonth : '',
    cardExpirationYear  : '',
    cardType            : 'visa',
  },
  addNewCardErrorMessage: '',
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



    /** Add New Card Start Action **/
    // Side Effects asociados: addNewCardSideEffect (toma los datos de la Cardes desde la base de datos mediante un HTTP Request)
    on(PaymentMethodsActions.AddNewCardStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Add New Card End Success Action **/
    // Side Effects asociados: addNewCardEndSuccessSideEffect (cerrar el Bottom Overlay, es decir, poner showBottomOverlay = false en la Global Store)
    on(PaymentMethodsActions.AddNewCardEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        newCard: action.addNewCardSuccessPayload,

        // TODO:
        // cards: [
        //   ...state.cards,
        //   action.addNewCardSuccessPayload,
        // ],
        
      })),

    /** |-> Add New Card End Failure Action **/
    on(PaymentMethodsActions.AddNewCardEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        addNewCardErrorMessage: action.addNewCardErrorMessagePayload,

      })),


    
    /** Save New Card To Store Action **/
    // Side Effects asociados: addNewCardSideEffect (toma los datos de la Cardes desde la base de datos mediante un HTTP Request)
    on(PaymentMethodsActions.SaveNewCardToStore,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        newCard: action.newCardPayload,
          
      })),


    
    /** Change Default Credit Action **/
    on(PaymentMethodsActions.ChangeDefaultPaymentMethod,
      (state, action) => {

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // - Cambiar el isDefault de la Credit Card seleccionada
        /* Editar un valor de un objeto que está dentro de un array (OpenAI Generated Code) */
        // Make a copy of the paymentMethods array
        const updatedPaymentMethods = [...state.paymentMethods];
        
        // Update the product quantity of the item at the specified index
        let selectedCreditCardIsDefaultOriginalValue = updatedPaymentMethods[action.paymentMethodArrayIdPayload]['isDefault'];
        updatedPaymentMethods[action.paymentMethodArrayIdPayload] = {
          ...updatedPaymentMethods[action.paymentMethodArrayIdPayload],
          isDefault: ( (updatedPaymentMethods[action.paymentMethodArrayIdPayload]['isDefault'] == 0) ? 1 : 0 ), // Cambiar el valor de 0 a 1 o viceversa
        };

        // - Si el valor de isDefault de la Credit Card seleccionada ha pasado de 0 a 1, poner el isDefault del resto de las Credit Cards a 0
        if ( selectedCreditCardIsDefaultOriginalValue == 0 ) {

          // Comprobacion
          // console.log('Poner el isDefault del resto de las Credit Cards a 0');

          for (let index = 0; index < updatedPaymentMethods.length; index++) {
            if ( index != action.paymentMethodArrayIdPayload ) {
            
              updatedPaymentMethods[index] = {
                ...updatedPaymentMethods[index],
                isDefault: 0,
              };

            }
          }

        }
        
        // Return the updated state
        return {
          ...state,
          paymentMethods: updatedPaymentMethods,
        };
          
      }),



);