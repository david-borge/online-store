// /*** CategoriesActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";

import { CategoryInterface } from "projects/web/src/app/core/models/category.interface";



/** Get All Categories Start Action **/
// Side Effects asociados: getAllCategoriesSideEffect (toma todos los categoryos desde la base de datos mediante un HTTP Request)
export const GetAllCategoriesStart = createAction(

  // Tipo de la Action
  '[Categories] Get All Categories Start',

);

/** |-> Get All Categories End Success Action **/
export const GetAllCategoriesEndSuccess = createAction(

  // Tipo de la Action
  '[Categories] Get All Categories End Success',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      allCategoriesPayload: CategoryInterface[],
  }>(),

);

/** |-> Get All Categories End Failure Action **/
export const GetAllCategoriesEndFailure = createAction(

  // Tipo de la Action
  '[Categories] Get All Categories End Failure',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
      // Si el método de la action requiere un solo parámetro, payload es un solo valor
      getAllCategoriesErrorMessagePayload: string,
  }>(),

);



/** Save Current Category Slug Action **/
export const SaveCurrentCategorySlug = createAction(

  // Tipo de la Action
  '[Home] Save Current Category Slug',

  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    currentCategorySlugPayload: string,
  }>(),

);



/** Count Images In This Page Action **/
export const CountImagesInThisPage = createAction(

  // Tipo de la Action
  '[Home] Count Images In This Page',

);



/** Count Images In This Page Loaded Action **/
export const CountImagesInThisPageLoaded = createAction(

  // Tipo de la Action
  '[Home] Count Images In This Page Loaded',

);



/** Set Categories Page Has Been Previously Visited To True Action **/
export const SetCategoriesPageHasBeenPrevouslyVisitedToTrue = createAction(

  // Tipo de la Action
  '[Categories] Set Categories Page Has Been Previously Visited To True',

);



/** Set Categories Page Images Loaded To True Action **/
export const SetCategoriesPageImagesLoadedToTrue = createAction(

  // Tipo de la Action
  '[Categories] Set Categories Page Images Loaded To True',

);



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Categories] Dummy Action',

);