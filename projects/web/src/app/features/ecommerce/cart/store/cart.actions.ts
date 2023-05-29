// /*** CartActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { CartInterface } from "projects/web/src/app/core/models/cart.interface";
import { ProductInterface } from "projects/web/src/app/core/models/product.interface";
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



/** Update Product Quantity Start Action **/
// Side Effects asociados: updateProductQuantitySideEffect (coger el Cart data del usuario actual desde la base de datos mediante un HTTP Request)
export const UpdateProductQuantityStart = createAction(

  // Tipo de la Action
  '[Cart] Update Product Quantity Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    cartDataArrayIdPayload : number,
    productQuantityPayload : CartInterface["productQuantity"],
    productIdPayload       : ProductInterface["id"],
  }>(),

);

/** |-> Update Product Quantity End Success Action **/
export const UpdateProductQuantityEndSuccess = createAction(

  // Tipo de la Action
  '[Cart] Update Product Quantity End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    cartDataArrayIdPayload : number,
    productQuantityPayload : CartInterface["productQuantity"],
    productIdPayload       : ProductInterface["id"],
  }>(),

);

/** |-> Update Product Quantity End Failure Action **/
export const UpdateProductQuantityEndFailure = createAction(

  // Tipo de la Action
  '[Cart] Update Product Quantity End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    updateProductQuantityErrorMessagePayload: string,
  }>(),

);



/** Delete Product From Cart Start Action **/
// Side Effects asociados: deleteProductFromCartSideEffect (coger el Cart data del usuario actual desde la base de datos mediante un HTTP Request)
export const DeleteProductFromCartStart = createAction(

  // Tipo de la Action
  '[Cart] Delete Product From Cart Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    cartDataArrayIdPayload : number,
    productIdPayload       : ProductInterface["id"],
  }>(),

);

/** |-> Delete Product From Cart End Success Action **/
export const DeleteProductFromCartEndSuccess = createAction(

  // Tipo de la Action
  '[Cart] Delete Product From Cart End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    cartDataArrayIdPayload : number,
    productIdPayload       : ProductInterface["id"],
  }>(),

);

/** |-> Delete Product From Cart End Failure Action **/
export const DeleteProductFromCartEndFailure = createAction(

  // Tipo de la Action
  '[Cart] Delete Product From Cart End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    deleteProductFromCartErrorMessagePayload: string,
  }>(),

);



/** Add Product To Cart Start Action **/
// Side Effects asociados: addProductToCartSideEffect (coger el Cart data del usuario actual desde la base de datos mediante un HTTP Request)
export const AddProductToCartStart = createAction(

  // Tipo de la Action
  '[Cart] Add Product To Cart Start',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    productSlugPayload : ProductInterface["slug"],
  }>(),

);

/** |-> Add Product To Cart End Success Action **/
export const AddProductToCartEndSuccess = createAction(

  // Tipo de la Action
  '[Cart] Add Product To Cart End Success',

  // Payload de la Action, si es que esta Action lo necesita
  // props<{
  //   // Si el método de la action requiere un solo parámetro, payload es un solo valor
  //   newProductDataPayload : GetCartDataPHPInterface["cartData"][0], // Como GetCartDataPHPInterface["cartData"] es un array, cojo solo un elemento
  // }>(),

);

/** |-> Add Product To Cart End Failure Action **/
export const AddProductToCartEndFailure = createAction(

  // Tipo de la Action
  '[Cart] Add Product To Cart End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    addProductToCartErrorMessagePayload: string,
  }>(),

);



/** Log Out Action **/
// Log Out: Borrar datos de la Cart Store (cartData, getCartDataErrorMessage, updateProductQuantityErrorMessage, newProductSlug, newProductQuantity)
export const LogOut = createAction(

  // Tipo de la Action
  '[Cart] Log Out',
  
);



/** Set Product Added To Cart To False Action **/
export const SetProductAddedToCartToFalse = createAction(

  // Tipo de la Action
  '[Cart] Set Product Added To Cart To False',
  
);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Cart] Dummy Action',

);