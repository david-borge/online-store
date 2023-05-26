// /*** OrderActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { GetOrderDataPHPInterface } from "projects/web/src/app/core/models/getOrderDataPHP.interface";
import { OrderInterface } from "projects/web/src/app/core/models/order.interface";
import { OrderProductInterface } from "projects/web/src/app/core/models/orderProduct.interface";
import { UserInterface } from "projects/web/src/app/core/models/user.interface";



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
    orderDataProductsAddressAndPaymentMethodPayload: GetOrderDataPHPInterface,
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



/** Save Order Start Action **/
// Side Effects asociados: saveOrderStartSideEffect (guardar la nueva Order en la base de datos mediante un HTTP Request)
export const SaveOrderStart = createAction(

  // Tipo de la Action
  '[Order] Save Order Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    orderFullDatePayload     : OrderInterface['orderFullDate'],
    deliveryFullDatePayload  : OrderInterface['deliveryFullDate'],
    addressIdPayload         : OrderInterface['addressId'],
    paymentMethodIdPayload   : OrderInterface['paymentMethodId'],
    orderProductsDataPayload : {
      productId      : OrderProductInterface['productId'],
      productQuantity: OrderProductInterface['productQuantity'],
    }[],
  }>(),

);

/** |-> Save Order End Success Action **/
// Side Effects asociados: saveOrderEndSuccessSideEffect (redireccionar a /checkout/order-confirmation)
export const SaveOrderEndSuccess = createAction(

  // Tipo de la Action
  '[Order] Save Order End Success',

);

/** |-> Save Order End Failure Action **/
export const SaveOrderEndFailure = createAction(

  // Tipo de la Action
  '[Order] Save Order End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    saveOrderDataErrorMessagePayload: string,
  }>(),

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);