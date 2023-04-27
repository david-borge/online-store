// /*** HomeActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */



import { createAction, props } from "@ngrx/store";




// /** Set Home Page Has Been Previously Visited Action **/
// export const SetHomePageHasBeenPrevouslyVisited = createAction(

//   // Tipo de la Action
//   '[Home] Set Home Page Has Been Previously Visited',

// );



/** Dummy Action **/
export const DummyAction = createAction(

  // Tipo de la Action
  '[Home] Dummy Action',

);