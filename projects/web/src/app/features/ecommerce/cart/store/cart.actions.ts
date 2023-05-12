// /*** CartActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { GetCartDataPHPInterface } from "projects/web/src/app/core/models/GetCartDataPHP.interface";



/** Increment In One The Number Of Images In This Page Action **/
export const IncrementInOneTheNumberOfImagesInThisPage = createAction(

  // Tipo de la Action
  '[Cart] Count Images In This Page',

);



/** Count Images In This Page Loaded Action **/
export const IncrementInOneTheNumberOfImagesInThisPageLoaded = createAction(

  // Tipo de la Action
  '[Cart] Count Images In This Page Loaded',

);



/** Set Cart Page Has Been Previously Visited To True Action **/
export const SetCartPageHasBeenPrevouslyVisitedToTrue = createAction(

  // Tipo de la Action
  '[Cart] Set Cart Page Has Been Previously Visited To True',

);



/** Set Cart Page Images Loaded To True Action **/
export const SetCartPageImagesLoadedToTrue = createAction(

  // Tipo de la Action
  '[Cart] Set Cart Page Images Loaded To True',

);



/** Get Cart Data Start Action **/
// Side Effects asociados: getCartDataSideEffect (coger el Cart data del usuario actual desde la base de datos mediante un HTTP Request)
export const GetCartDataStart = createAction(

  // Tipo de la Action
  '[Cart] Get Cart Data Start',

);

/** |-> Get Cart Data End Success Action **/
export const GetCartDataEndSuccess = createAction(

  // Tipo de la Action
  '[Cart] Get Cart Data End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      cartDataPayload: GetCartDataPHPInterface["cartData"],
  }>(),

);

/** |-> Get Cart Data End Failure Action **/
export const GetCartDataEndFailure = createAction(

  // Tipo de la Action
  '[Cart] Get Cart Data End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getCartDataErrorMessagePayload: string,
  }>(),

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);