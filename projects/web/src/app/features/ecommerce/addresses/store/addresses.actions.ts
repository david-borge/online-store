// /*** AddressesActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { AddressInterface } from "projects/web/src/app/core/models/address.interface";
import { CountryInterface } from "projects/web/src/app/core/models/country.interface";
import { GetAddressesPHPInterface } from "projects/web/src/app/core/models/getAddressesPHP.interface";
// import { AddNewAddressPHPInterface } from "projects/web/src/app/core/models/AddNewAddressPHPInterface";



/** Get Addresses Start Action **/
// Side Effects asociados: getAddressesSideEffect (toma los datos de la Address desde la base de datos mediante un HTTP Request)
export const GetAddressesStart = createAction(

  // Tipo de la Action
  '[Addresses] Get Addresses Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    userEmailPayload: string,
  }>(),

);

/** |-> Get Addresses End Success Action **/
export const GetAddressesEndSuccess = createAction(

  // Tipo de la Action
  '[Addresses] Get Addresses End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      addressesPayload: GetAddressesPHPInterface["addresses"],
  }>(),

);

/** |-> Get Addresses End Failure Action **/
export const GetAddressesEndFailure = createAction(

  // Tipo de la Action
  '[Addresses] Get Addresses End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getAddressesErrorMessagePayload: string,
  }>(),

);



/** Get All Countries Start Action **/
// Side Effects asociados: getAllCountriesSideEffect (añadir la nueva address a la base de datos mediante un HTTP Request)
export const GetAllCountriesStart = createAction(

  // Tipo de la Action
  '[Addresses] Get All Countries Start',

);

/** |-> Get All Countries End Success Action **/
export const GetAllCountriesEndSuccess = createAction(

  // Tipo de la Action
  '[Addresses] Get All Countries End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      allCountriesPayload: CountryInterface[],
  }>(),

);

/** |-> Get All Countries End Failure Action **/
export const GetAllCountriesEndFailure = createAction(

  // Tipo de la Action
  '[Addresses] Get All Countries End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getAllCountriesErrorMessagePayload: string,
  }>(),

);



/** Add New Address Start Action **/
// Side Effects asociados: addNewAddressSideEffect (añadir la nueva address a la base de datos mediante un HTTP Request)
export const AddNewAddressStart = createAction(

  // Tipo de la Action
  '[Addresses] Add New Address Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    newAddressPayload: {
      fullName   : AddressInterface["fullName"],
      address    : AddressInterface["address"],
      postalCode : AddressInterface["postalCode"],
      city       : AddressInterface["city"],
      countryId  : AddressInterface["countryId"],
    },
    newAddressCountryNamePayload: GetAddressesPHPInterface['addresses'][0]['country'] | undefined,
  }>(),

);

/** |-> Add New Address End Success Action **/
export const AddNewAddressEndSuccess = createAction(

  // Tipo de la Action
  '[Addresses] Add New Address End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      newAddressId: AddressInterface['id'],
      addNewAddresSuccessPayload: GetAddressesPHPInterface["addresses"][0],
  }>(),

);

/** |-> Add New Address End Failure Action **/
export const AddNewAddressEndFailure = createAction(

  // Tipo de la Action
  '[Addresses] Add New Address End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      addNewAddressErrorMessagePayload: string,
  }>(),

);



/** Save New Address To Store Action **/
// Side Effects asociados: addNewAddressSideEffect (añadir la nueva address a la base de datos mediante un HTTP Request)
export const SaveNewAddressToStore = createAction(

  // Tipo de la Action
  '[Addresses] Save New Address To Store',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    newAddressPayload: {
      fullName   : AddressInterface["fullName"],
      address    : AddressInterface["address"],
      postalCode : AddressInterface["postalCode"],
      city       : AddressInterface["city"],
      countryId  : AddressInterface["countryId"],
    },
    newAddressCountryNamePayload: GetAddressesPHPInterface['addresses'][0]['country'],
  }>(),

);



/** Change Default Address Start Action **/
// Side Effects asociados: changeDefaultAddressSideEffect (cambiar el valor de isDefault en la Addresses Store y en la Base de Datos mediante un HTTP Request: al seleccionar una, desactivar el resto)
export const ChangeDefaultAddressStart = createAction(

  // Tipo de la Action
  '[Addresses] Change Default Address Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    addressArrayIdPayload: number,
    addressCardIdPayload : AddressInterface["id"],
  }>(),

);



/** Change Default Address End Success Action **/
export const ChangeDefaultAddressEndSuccess = createAction(

  // Tipo de la Action
  '[Addresses] Change Default Address End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    addressArrayIdPayload: number,
  }>(),

);



/** Change Default Address End Failure Action **/
export const ChangeDefaultAddressEndFailure = createAction(

  // Tipo de la Action
  '[Addresses] Change Default Address End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    changeDefaultAddressErrorMessagePayload: string,
  }>(),

);



/** Log Out Action **/
// Log Out: Borrar datos de la Addresses Store (addresses; countries; getAllCountriesErrorMessage; newAddress; newAddressCountryName; addNewAddressErrorMessage)
export const LogOut = createAction(

  // Tipo de la Action
  '[Global] Log Out',
  
);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);