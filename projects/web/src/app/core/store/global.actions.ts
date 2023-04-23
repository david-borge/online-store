// /*** GlobalActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";



/** Set First Visited Page Action **/
// Side Effects asociados: getAllProductsSideEffect (toma todos los Products desde la base de datos mediante un HTTP Request)
export const SetFirstVisitedPage = createAction(

  // Tipo de la Action
  '[Global] Set First Visited Page',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    visitedPageURLPayload: string,
  }>(),

);



/** Set Active Navigation Item Action **/
export const SetActiveNavigationItem = createAction(

  // Tipo de la Action
  '[Global] Set Active Navigation Item',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    activeNavigationItemPayload: string,
  }>(),

);



/** Set Last Active Main Page Action **/
export const SetLastActiveMainPage = createAction(

  // Tipo de la Action
  '[Global] Set Last Active Main Page',
  
  // Payload de la Action, si es que esta Action lo necesita
  props<{
    // Si el método de la action requiere un solo parámetro, payload es un solo valor
    lastActiveMainPagePayload: string,
  }>(),

);