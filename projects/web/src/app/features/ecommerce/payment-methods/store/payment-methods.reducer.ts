// /*** paymentMethodsReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as PaymentMethodsActions from "./payment-methods.actions";  // Importar todo y guardarlo en el alias PaymentMethodsActions

import { GetPaymentMethodsPHPInterface } from "projects/web/src/app/core/models/getPaymentMethodsPHP.interface";
import { PaymentMethodInterface } from "projects/web/src/app/core/models/paymentMethod.interface";
import { ProcessStatusInterface } from "projects/web/src/app/core/models/processStatus.interface";




// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface PaymentMethodsReducerStateInterface {
  // loadStatus: ProcessStatusInterface['processStatus'];
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
  addNewCardStatus: ProcessStatusInterface['processStatus'];
  addNewCardErrorMessage: string;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: PaymentMethodsReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_STARTED',
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
  addNewCardStatus: 'NOT_STARTED',
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

        addNewCardStatus: 'STARTED',
          
      })),

    /** |-> Add New Card End Success Action **/
    // Side Effects asociados: addNewCardEndSuccessSideEffect (cerrar el Bottom Overlay, es decir, poner showBottomOverlay = false en la Global Store)
    on(PaymentMethodsActions.AddNewCardEndSuccess,
      (state, action) => {

        
        // - Cambiar el isDefault a 0 de las otras Credit Cards
        /* Editar un valor de un objeto que está dentro de un array (OpenAI Generated Code) */
        // Make a copy of the paymentMethods array
        const updatedPaymentMethods = [...state.paymentMethods];
      
        for (let index = 0; index < updatedPaymentMethods.length; index++) {
          if ( index != action.newCardId ) {
          
            updatedPaymentMethods[index] = {
              ...updatedPaymentMethods[index],
              isDefault: 0,
            };

          }
        }

        // Return the updated state
        return {
          ...state,
          paymentMethods: [
            ...updatedPaymentMethods,
            {
              id: action.newCardId,
              userId: 0, // Da igual, es solo para la Store
              type: action.newCardPayload.type,
              cardBankName: action.newCardPayload.cardBankName,
              cardPersonFullName: action.newCardPayload.cardPersonFullName,
              cardLastFourNumbers: action.newCardPayload.cardNumber.substring(action.newCardPayload.cardNumber.length - 4), // Los 4 últimos números
              cardExpirationMonth: action.newCardPayload.cardExpirationMonth,
              cardExpirationYear: action.newCardPayload.cardExpirationYear,
              cardType: action.newCardPayload.cardType,
              isDefault: 1,
            },
          ],
          addNewCardStatus: 'NOT_STARTED', // Reseteo el valor
        };
        
      }),

    /** |-> Add New Card End Failure Action **/
    on(PaymentMethodsActions.AddNewCardEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
        
        addNewCardStatus: 'ENDED_FAILED',

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


    
    /** Change Default Credit Start Action **/
    // Side Effects asociados: changeDefaultPaymentMethodSideEffect (cambiar el valor de isDefault en la Payment Methods Store y en la Base de Datos mediante un HTTP Request: al seleccionar una, desactivar el resto)
    // Actualizo la Store en el Start y no en EndSuccess para que no haya ese retardo de milisegundos en la interfaz provocado por la HTTP Request
    on(PaymentMethodsActions.ChangeDefaultPaymentMethodStart,
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



    /** Log Out Action **/
    // Log Out: Borrar datos de la PaymentMethods Store (paymentMethods, newCard, addNewCardErrorMessage)
    on(PaymentMethodsActions.LogOut,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        paymentMethods: [],
        newCard: {} as {
          type                : PaymentMethodInterface["type"],
          cardBankName        : PaymentMethodInterface["cardBankName"],
          cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
          cardNumber          : PaymentMethodInterface["cardNumber"],
          cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
          cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
          cardType            : PaymentMethodInterface["cardType"],
        },
        addNewCardErrorMessage: '',
        
      })),


);