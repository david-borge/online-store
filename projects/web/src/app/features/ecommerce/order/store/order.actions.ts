// /*** OrderActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { OrderInterface } from "projects/web/src/app/core/models/order.interface";



/** Save Current Order Slug Action **/
export const SaveCurrentOrderSlug = createAction(

  // Tipo de la Action
  '[Order] Save Current Order Slug',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    currentOrderSlugPayload: number,
  }>(),

);



/** Get Order Data Start Action **/
// Side Effects asociados: getOrderDataSideEffect (toma los datos de la Order desde la base de datos mediante un HTTP Request)
export const GetOrderDataStart = createAction(

  // Tipo de la Action
  '[Order] Get Order Data Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    orderNumberPayload: number,
  }>(),

);

/** |-> Get Order Data End Success Action **/
export const GetOrderDataEndSuccess = createAction(

  // Tipo de la Action
  '[Order] Get Order Data End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      orderDataPayload: OrderInterface,
  }>(),

);

/** |-> Get Order Data End Failure Action **/
export const GetOrderDataEndFailure = createAction(

  // Tipo de la Action
  '[Order] Get Order Data End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getOrderDataErrorMessagePayload: string,
  }>(),

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);