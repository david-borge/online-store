// /*** HomeActions ***/
/* Un Action es un objecto JS con:
· Un identificador de tipo (action.type), que indica el tipo de Action que queremos ejecutar (aka Side Effects). Por ejemplo: HTTP Requests (añadir una receta, borrar una receta...), usar LocalStorage o hacer redirects.
    Soy yo el que establezco qué tipo de Actions tiene mi aplicación.
    La notación del identificador de tipo (action.type) es en mayúsculas y con barra baja. Ejemplo: ADD_INGREDIENT
· Y, opcionalmente, un payload. Por ejemplo, si quiero añadir una nueva receta, los datos de la nueva receta. */

import { createAction, props } from '@ngrx/store';

import { GetCurrentProductReviewsPHPInterface } from 'projects/web/src/app/core/models/getCurrentProductReviewsPHP.interface';
import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

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
        allProductsPayload: ProductInterface[];
    }>(),
);

/** |-> Get All Products End Failure Action **/
export const GetAllProductsEndFailure = createAction(
    // Tipo de la Action
    '[Home] Get All Products End Failure',

    // Payload de la Action, si es que esta Action lo necesita
    props<{
        // Si el método de la action requiere un solo parámetro, payload es un solo valor
        getAllProductsErrorMessagePayload: string;
    }>(),
);

/** Save Current Product Slug Action **/
export const SaveCurrentProductSlug = createAction(
    // Tipo de la Action
    '[Home] Save Current Product Slug',

    // Payload de la Action, si es que esta Action lo necesita
    props<{
        // Si el método de la action requiere un solo parámetro, payload es un solo valor
        currentProductSlugPayload: string;
    }>(),
);

/** Increment In One The Number Of Images In This Page Action **/
export const IncrementInOneTheNumberOfImagesInThisPage = createAction(
    // Tipo de la Action
    '[Home] Count Images In This Page',
);

/** Count Images In This Page Loaded Action **/
export const IncrementInOneTheNumberOfImagesInThisPageLoaded = createAction(
    // Tipo de la Action
    '[Home] Count Images In This Page Loaded',
);

/** Set Home Page Has Been Previously Visited To True Action **/
export const SetHomePageHasBeenPrevouslyVisitedToTrue = createAction(
    // Tipo de la Action
    '[Home] Set Home Page Has Been Previously Visited To True',
);

/** Set Home Page Images Loaded To True Action **/
export const SetHomePageImagesLoadedToTrue = createAction(
    // Tipo de la Action
    '[Home] Set Home Page Images Loaded To True',
);

/** Get Current Product Reviews Start Action **/
// Side Effects asociados: getCurrentProductReviewsSideEffect (toma todos las Reviews de un Product desde la base de datos mediante un HTTP Request)
export const GetCurrentProductReviewsStart = createAction(
    // Tipo de la Action
    '[Home] Get Current Product Reviews Start',

    // Payload de la Action, si es que esta Action lo necesita
    props<{
        // Si el método de la action requiere un solo parámetro, payload es un solo valor
        currentProductSlugPayload: string;
    }>(),
);

/** |-> Get Current Product Reviews End Success Action **/
export const GetCurrentProductReviewsEndSuccess = createAction(
    // Tipo de la Action
    '[Home] Get Current Product Reviews End Success',

    // Payload de la Action, si es que esta Action lo necesita
    props<{
        // Si el método de la action requiere un solo parámetro, payload es un solo valor
        currentProductReviewsPayload: GetCurrentProductReviewsPHPInterface[];
    }>(),
);

/** |-> Get Current Product Reviews End Failure Action **/
export const GetCurrentProductReviewsEndFailure = createAction(
    // Tipo de la Action
    '[Home] Get Current Product Reviews End Failure',

    // Payload de la Action, si es que esta Action lo necesita
    props<{
        // Si el método de la action requiere un solo parámetro, payload es un solo valor
        getCurrentProductReviewsErrorMessagePayload: string;
    }>(),
);

/** Dummy Action **/
export const DummyAction = createAction(
    // Tipo de la Action
    '[Home] Dummy Action',
);
