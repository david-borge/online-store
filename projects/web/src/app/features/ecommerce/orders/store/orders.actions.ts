// /*** OrdersActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { GetOrdersPHPInterface } from "projects/web/src/app/core/models/getOrdersPHP.interface";



/** Get Orders Start Action **/
// Side Effects asociados: getOrdersSideEffect (toma los datos de la Order desde la base de datos mediante un HTTP Request)
export const GetOrdersStart = createAction(

  // Tipo de la Action
  '[Orders] Get Orders Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    userEmailPayload: string,
  }>(),

);

/** |-> Get Orders End Success Action **/
export const GetOrdersEndSuccess = createAction(

  // Tipo de la Action
  '[Orders] Get Orders End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      ordersPayload: GetOrdersPHPInterface["orders"],
  }>(),

);

/** |-> Get Orders End Failure Action **/
export const GetOrdersEndFailure = createAction(

  // Tipo de la Action
  '[Orders] Get Orders End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getOrdersErrorMessagePayload: string,
  }>(),

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);