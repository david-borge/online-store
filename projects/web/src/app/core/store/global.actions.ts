// /*** GlobalActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";



/** Set First Visited Page Action **/
// Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
export const SetFirstVisitedPage = createAction(

  // Tipo de la Action
  '[Global] Set First Visited Page',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    visitedPageURLPayload: string,
  }>(),

);



/** Set Active Navigation Item Action **/
export const SetActiveNavigationItem = createAction(

  // Tipo de la Action
  '[Global] Set Active Navigation Item',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    activeNavigationItemPayload: string | null,
  }>(),

);



/** Set Local Storage Key Value Action **/
// Side Effects asociados: setLocalStorageKeyValueSideEffect
export const SetLocalStorageKeyValue = createAction(

  // Tipo de la Action
  '[Global] Set Local Storage Key Value',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    localStorageKeyPayload: string,
    localStorageValuePayload: string,
  }>(),

);



/** Get Local Storage Value Start Action **/
// Side Effects asociados: getLocalStorageValueSideEffect
export const GetLocalStorageValueStart = createAction(

  // Tipo de la Action
  '[Global] Get Local Storage Value Start',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    localStorageKeyPayload: string,
  }>(),

);



/** Get Local Storage Value End Action **/
// Side Effects asociados: getLocalStorageValueSideEffect
export const GetLocalStorageValueEnd = createAction(

  // Tipo de la Action
  '[Global] Get Local Storage Value End',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    localStorageKeyPayload: string,
    localStorageValuePayload: string | null,
  }>(),

);



/** Set Cookie Key Value Action **/
// Side Effects asociados: setCookieKeyValueSideEffect
export const SetCookieKeyValue = createAction(

  // Tipo de la Action
  '[Global] Set Cookie Key Value',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    cookieKeyPayload: string,
    cookieValuePayload: string,
  }>(),

);



/** Get Auth Cookie Value Start Action **/
// Side Effects asociados: getAuthCookieValueSideEffect
export const GetAuthCookieValueStart = createAction(

  // Tipo de la Action
  '[Global] Get Auth Cookie Value Start',
  
);



/** Get Auth Cookie Value End Action **/
// Side Effects asociados: getAuthCookieValueSideEffect
export const GetAuthCookieValueEnd = createAction(

  // Tipo de la Action
  '[Global] Get Auth Cookie Value End',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    authCookieValuePayload: string | null,
  }>(),

);



/** Set Logged In To True Action **/
export const SetLoggedInToTrue = createAction(

  // Tipo de la Action
  '[Global] Set Logged In To True',

);



/** Change Auth Mode Action **/
export const ChangeAuthMode = createAction(

  // Tipo de la Action
  '[Global] Change Auth Mode',

);



/** Sign Up Action Start **/
// Side Effects asociados: signUpSideEffect
export const SignUpStart = createAction(

  // Tipo de la Action
  '[Global] Sign Up Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    firstNamePayload: string,
    lastNamePayload: string,
    emailPayload: string,
    passwordPayload: string,
    signUpFullDatePayload: string,
    lastLoginFullDatePayload: string,
  }>(),

);



/** Sign Up Action End Success **/
export const SignUpEndSuccess = createAction(

  // Tipo de la Action
  '[Global] Sign Up End Success',

);



/** Sign Up Action End Failure **/
export const SignUpEndFailure = createAction(

  // Tipo de la Action
  '[Global] Sign Up End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    signUpResultFailurePayload: string,
  }>(),

);



/** Log In Action Start **/
// Side Effects asociados: logInStartSideEffect
export const LogInStart = createAction(

  // Tipo de la Action
  '[Global] Log In Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    emailPayload: string,
    passwordPayload: string,
    lastLoginFullDatePayload: string,
  }>(),

);



/** Log In Action End Success **/
export const LogInEndSuccess = createAction(

  // Tipo de la Action
  '[Global] Log In End Success',

);



/** Log In Action End Failure **/
export const LogInEndFailure = createAction(

  // Tipo de la Action
  '[Global] Log In End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    logInResultFailurePayload: string,
  }>(),

);



/** Empty Sign Up Log In Result Action **/
export const EmptySignUpLogInResult = createAction(

  // Tipo de la Action
  '[Global] Empty Sign Up Log In Result',

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Global] Dummy Action',

);