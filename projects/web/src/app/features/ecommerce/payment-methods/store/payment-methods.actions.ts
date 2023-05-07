// /*** PaymentMethodsActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { GetPaymentMethodsPHPInterface } from "projects/web/src/app/core/models/getPaymentMethodsPHP.interface";



/** Get PaymentMethods Start Action **/
// Side Effects asociados: getPaymentMethodsSideEffect (toma los datos de la Payment Method desde la base de datos mediante un HTTP Request)
export const GetPaymentMethodsStart = createAction(

  // Tipo de la Action
  '[PaymentMethods] Get PaymentMethods Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    userEmailPayload: string,
  }>(),

);

/** |-> Get PaymentMethods End Success Action **/
export const GetPaymentMethodsEndSuccess = createAction(

  // Tipo de la Action
  '[PaymentMethods] Get PaymentMethods End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      paymentMethodsPayload: GetPaymentMethodsPHPInterface['paymentMethods'],
  }>(),

);

/** |-> Get PaymentMethods End Failure Action **/
export const GetPaymentMethodsEndFailure = createAction(

  // Tipo de la Action
  '[PaymentMethods] Get PaymentMethods End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getPaymentMethodsErrorMessagePayload: string,
  }>(),

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);