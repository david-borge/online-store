// /*** PaymentMethodsActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { PaymentMethodInterface } from "projects/web/src/app/core/models/paymentMethod.interface";
// import { AddNewCardPHPInterface } from "projects/web/src/app/core/models/AddNewCardPHPInterface";
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



/** Add New Card Start Action **/
// Side Effects asociados: addNewCardSideEffect (añadir la nueva Card a la base de datos mediante un HTTP Request)
export const AddNewCardStart = createAction(

  // Tipo de la Action
  '[PaymentMethods] Add New Card Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    newCardPayload: {
      type                : PaymentMethodInterface["type"],
      cardBankName        : PaymentMethodInterface["cardBankName"],
      cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
      cardNumber          : PaymentMethodInterface["cardNumber"],
      cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
      cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
      cardType            : PaymentMethodInterface["cardType"],
    },
  }>(),

);

/** |-> Add New Card End Success Action **/
export const AddNewCardEndSuccess = createAction(

  // Tipo de la Action
  '[PaymentMethods] Add New Card End Success',

  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    newCardId  : PaymentMethodInterface['id'],
    newCardPayload: {
      type                : PaymentMethodInterface["type"],
      cardBankName        : PaymentMethodInterface["cardBankName"],
      cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
      cardNumber          : PaymentMethodInterface["cardNumber"],
      cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
      cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
      cardType            : PaymentMethodInterface["cardType"],
    },
  }>(),

);

/** |-> Add New Card End Failure Action **/
export const AddNewCardEndFailure = createAction(

  // Tipo de la Action
  '[PaymentMethods] Add New Card End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      addNewCardErrorMessagePayload: string,
  }>(),

);



/** Save New Card To Store Action **/
// Side Effects asociados: addNewCardSideEffect (añadir la nueva card a la base de datos mediante un HTTP Request)
export const SaveNewCardToStore = createAction(

  // Tipo de la Action
  '[PaymentMethods] Save New Card To Store',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    newCardPayload: {
      type                : PaymentMethodInterface["type"],
      cardBankName        : PaymentMethodInterface["cardBankName"],
      cardPersonFullName  : PaymentMethodInterface["cardPersonFullName"],
      cardNumber          : PaymentMethodInterface["cardNumber"],
      cardExpirationMonth : PaymentMethodInterface["cardExpirationMonth"],
      cardExpirationYear  : PaymentMethodInterface["cardExpirationYear"],
      cardType            : PaymentMethodInterface["cardType"],
    },
  }>(),

);



/** Change Default Payment Method Start Action **/
// Side Effects asociados: changeDefaultPaymentMethodSideEffect (cambiar el valor de isDefault en la Payment Methods Store y en la Base de Datos mediante un HTTP Request: al seleccionar una, desactivar el resto)
// Actualizo la Store en el Start y no en EndSuccess para que no haya ese retardo de milisegundos en la interfaz provocado por la HTTP Request
export const ChangeDefaultPaymentMethodStart = createAction(

  // Tipo de la Action
  '[PaymentMethods] Change Default Payment Method',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    paymentMethodArrayIdPayload: number,
    paymentMethodIdPayload     : PaymentMethodInterface['id'],
  }>(),

);

/** |-> Change Default Payment Method End Success Action **/
export const ChangeDefaultPaymentMethodEndSuccess = createAction(

  // Tipo de la Action
  '[PaymentMethods] Change Default Payment Method End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    paymentMethodArrayIdPayload: number,
  }>(),

);

/** |-> Change Default Payment Method End Failure Action **/
export const ChangeDefaultPaymentMethodEndFailure = createAction(

  // Tipo de la Action
  '[PaymentMethods] Change Default Payment Method End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    changeDefaultPaymentMethodErrorMessagePayload: string,
  }>(),

);



/** Log Out Action **/
// Log Out: Borrar datos de la PaymentMethods Store (paymentMethods, newCard, addNewCardErrorMessage)
export const LogOut = createAction(

  // Tipo de la Action
  '[PaymentMethods] Log Out',
  
);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[PaymentMethods] Dummy Action',

);