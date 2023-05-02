// /*** globalReducer ***/



import { createReducer, on } from "@ngrx/store";

import * as GlobalActions from "./global.actions";  // Importar todo y guardarlo en el alias GlobalActions



// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface GlobalReducerStateInterface {
  // loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  firstVisitedPage: string;
  activeNavigationItem: string | null;
  lastActiveMainPage: string | null;
  loggedIn: boolean;
  authCookieValue: string | null;
  authMode: 'SIGNUP' | 'LOGIN';
  signUpLogInResult: string;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: GlobalReducerStateInterface = {
  // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
  // loadStatus: 'NOT_LOADED',
  firstVisitedPage: '',
  activeNavigationItem: '',
  lastActiveMainPage: '',
  loggedIn: false,
  authCookieValue: '',
  authMode: 'SIGNUP',
  signUpLogInResult: '',
}



export const globalReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.



    /** Set First Visited Page Action **/
    // Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
    on(GlobalActions.SetFirstVisitedPage,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        firstVisitedPage: action.visitedPageURLPayload,
          
      })),



    /** Set Active Navigation Item Action **/
    on(GlobalActions.SetActiveNavigationItem,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        activeNavigationItem: action.activeNavigationItemPayload,
          
      })),



    /** Set Local Storage Key Value Action **/
    // Side Effects asociados: setLocalStorageKeyValueSideEffect
    on(GlobalActions.SetLocalStorageKeyValue,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        lastActiveMainPage: action.localStorageValuePayload,
          
      })),



    /** Get Local Storage Value Start Action **/
    // Side Effects asociados: getLocalStorageValueSideEffect
    on(GlobalActions.GetLocalStorageValueStart,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        lastActiveMainPage: action.localStorageKeyPayload,
          
      })),



    /** Get Local Storage Value Start Action **/
    on(GlobalActions.GetLocalStorageValueEnd,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        lastActiveMainPage: action.localStorageValuePayload,
          
      })),



    /** Set Cookie Key Value Action **/
    // Side Effects asociados: setCookieKeyValueSideEffect
    on(GlobalActions.SetCookieKeyValue,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // lastActiveMainPage: action.cookieValuePayload,
          
      })),



    /** Get Auth Cookie Value Start Action **/
    // Side Effects asociados: getAuthCookieValueSideEffect
    on(GlobalActions.GetAuthCookieValueEnd,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        authCookieValue: action.authCookieValuePayload,
          
      })),



    /** Set Logged In To True Action **/
    on(GlobalActions.SetLoggedInToTrue,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        loggedIn: true,
          
      })),



    /** Change Auth Mode Action **/
    on(GlobalActions.ChangeAuthMode,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        authMode: ( (state.authMode == 'SIGNUP') ? 'LOGIN' : 'SIGNUP' ),
          
      })),



    /** Sign Up Action Start Action **/
    // Side Effects asociados: signUpSideEffect
    on(GlobalActions.SignUpStart,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

      })),



    /** Sign Up Action End Success Action **/
    on(GlobalActions.SignUpEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

      })),



    /** Sign Up Action End Failure Action **/
    on(GlobalActions.SignUpEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        signUpLogInResult: action.signUpResultFailurePayload,
          
      })),



    /** Log In Action Start Action **/
    // Side Effects asociados: logInStartSideEffect
    on(GlobalActions.LogInStart,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

      })),



    /** Log In Action End Success Action **/
    // Side Effects asociados: logInEndSuccessSideEffect
    on(GlobalActions.LogInEndSuccess,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        loggedIn: true,
          
      })),



    /** Log In Action End Failure Action **/
    on(GlobalActions.LogInEndFailure,
      (state, action) => ({

        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        signUpLogInResult: action.logInResultFailurePayload,
          
      })),


    /** Empty Sign Up Log In Result Action **/
    on(GlobalActions.EmptySignUpLogInResult,
      (state, action) => ({

        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        signUpLogInResult: '',
          
      })),



);