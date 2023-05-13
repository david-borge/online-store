// /*** addressesReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as AddressesActions from "./addresses.actions";  // Importar todo y guardarlo en el alias AddressesActions

import { GetAddressesPHPInterface } from "projects/web/src/app/core/models/getAddressesPHP.interface";
import { CountryInterface } from "projects/web/src/app/core/models/country.interface";
import { AddressInterface } from "projects/web/src/app/core/models/address.interface";



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface AddressesReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  addresses: GetAddressesPHPInterface["addresses"];
  countries: CountryInterface[];
  getAllCountriesErrorMessage: string;
  newAddress: {
    fullName   : AddressInterface["fullName"],
    address    : AddressInterface["address"],
    postalCode : AddressInterface["postalCode"],
    city       : AddressInterface["city"],
    countryId  : AddressInterface["countryId"],
  };
  addNewAddressErrorMessage: string;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: AddressesReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  addresses: [],
  countries: [],
  getAllCountriesErrorMessage: '',
  newAddress: {} as AddressInterface,
  addNewAddressErrorMessage: '',
}



export const addressesReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.


    
    /** Get Addresses Start Action **/
    // Side Effects asociados: getAddressesSideEffect (toma los datos de la Addresses desde la base de datos mediante un HTTP Request)
    on(AddressesActions.GetAddressesStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get Addresses End Success Action **/
    on(AddressesActions.GetAddressesEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        addresses: action.addressesPayload,
        
      })),

    /** |-> Get Addresses End Failure Action **/
    on(AddressesActions.GetAddressesEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),


    
    /** Get All Countries Start Action **/
    // Side Effects asociados: getAllCountriesSideEffect (toma los datos de la Addresses desde la base de datos mediante un HTTP Request)
    on(AddressesActions.GetAllCountriesStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Get All Countries End Success Action **/
    on(AddressesActions.GetAllCountriesEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        countries: action.allCountriesPayload,
        
      })),

    /** |-> Get All Countries End Failure Action **/
    on(AddressesActions.GetAllCountriesEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        getAllCountriesErrorMessage: action.getAllCountriesErrorMessagePayload,

      })),


    
    /** Add New Address Start Action **/
    // Side Effects asociados: addNewAddressSideEffect (toma los datos de la Addresses desde la base de datos mediante un HTTP Request)
    on(AddressesActions.AddNewAddressStart,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
      })),

    /** |-> Add New Address End Success Action **/
    on(AddressesActions.AddNewAddressEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        newAddress: action.addNewAddresSuccessPayload,

        // TODO:
        // addresses: [
        //   ...state.addresses,
        //   action.addNewAddresSuccessPayload,
        // ],
        
      })),

    /** |-> Add New Address End Failure Action **/
    on(AddressesActions.AddNewAddressEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
          
        // Mensaje de error
        addNewAddressErrorMessage: action.addNewAddressErrorMessagePayload,

      })),


    
    /** Save New Address To Store Action **/
    // Side Effects asociados: addNewAddressSideEffect (toma los datos de la Addresses desde la base de datos mediante un HTTP Request)
    on(AddressesActions.SaveNewAddressToStore,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        newAddress: action.newAddressPayload,
          
      })),

);