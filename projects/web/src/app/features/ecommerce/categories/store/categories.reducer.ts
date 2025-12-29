// /*** categoriesReducer ***/

import { createReducer, on } from '@ngrx/store';

import { CategoryInterface } from '@core/models/category.interface';

import * as CategoriesActions from './categories.actions'; // Importar todo y guardarlo en el alias CategoriesActions

// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface CategoriesReducerStateInterface {
    // loadStatus: ProcessStatus;
    allCategories: CategoryInterface[];
    currentCategorySlug: string;
    numberOfImagesInThisPage: number;
    numberOfImagesInThisPageLoaded: number;
    categoriesPageImagesLoaded: boolean;
    categoriesPagePreviouslyVisited: boolean;
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: CategoriesReducerStateInterface = {
    // loadStatus: ProcessStatus.NOT_STARTED,
    // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
    allCategories: [],
    currentCategorySlug: '',
    numberOfImagesInThisPage: 0,
    numberOfImagesInThisPageLoaded: 0,
    categoriesPageImagesLoaded: false,
    categoriesPagePreviouslyVisited: false,
};

export const categoriesReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.

    /** Get All Categories Start Action **/
    // Side Effects asociados: getAllCategoriesSideEffect (toma todos las Categories desde la base de datos mediante un HTTP Request)
    on(CategoriesActions.GetAllCategoriesStart, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** |-> Get All Categories End Success Action **/
    on(CategoriesActions.GetAllCategoriesEndSuccess, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        allCategories: [
            // Cuidado: NO hay que copiar las Categories en este caso porque los estoy cargando todos desde la base de datos

            // Añadir un valor a un array - Si lo que devuelve esta Action SÍ es un array
            ...action.allCategoriesPayload,
        ],
    })),

    /** |-> Get All Categories End Failure Action **/
    on(CategoriesActions.GetAllCategoriesEndFailure, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** Save Current Category Slug Action **/
    on(CategoriesActions.SaveCurrentCategorySlug, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        currentCategorySlug: action.currentCategorySlugPayload,
    })),

    /** Increment In One The Number Of Images In This Page Action **/
    on(CategoriesActions.IncrementInOneTheNumberOfImagesInThisPage, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPage: state.numberOfImagesInThisPage + 1,
    })),

    /** Increment In One The Number Of Images In This Page Loaded Action **/
    on(CategoriesActions.IncrementInOneTheNumberOfImagesInThisPageLoaded, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        numberOfImagesInThisPageLoaded: state.numberOfImagesInThisPageLoaded + 1,
    })),

    /** Set Categories Page Has Been Previously Visited To True Action **/
    on(CategoriesActions.SetCategoriesPageHasBeenPrevouslyVisitedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        categoriesPagePreviouslyVisited: true,
    })),

    /** Set Categories Page Images Loaded To True Action **/
    on(CategoriesActions.SetCategoriesPageImagesLoadedToTrue, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        categoriesPageImagesLoaded: true,
    })),
);
