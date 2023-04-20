// /*** HomeActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { ProductInterface } from "projects/web/src/app/core/models/product.interface";



/** Get All Products Start Action **/
// Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
export const GetAllProductsStart = createAction(

  // Tipo de la Action
  '[Home] Get All Products Start',

);

/** |-> Get All Products End Success Action **/
export const GetAllProductsEndSuccess = createAction(

  // Tipo de la Action
  '[Home] Get All Products End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      allProductsPayload: ProductInterface[],
  }>()

);

/** |-> Get All Products End Failure Action **/
export const GetAllProductsEndFailure = createAction(

  // Tipo de la Action
  '[Home] Get All Products End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getAllProductsErrorMessagePayload: string,
  }>()

);
