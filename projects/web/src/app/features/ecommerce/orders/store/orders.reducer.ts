// /*** ordersReducer ***/

import { createReducer, on } from '@ngrx/store';

import { GetOrdersPHPInterface } from '@core/models/getOrdersPHP.interface';

import * as OrdersActions from './orders.actions'; // Importar todo y guardarlo en el alias OrdersActions

// Reducer State (inicial) - Tipos (definidos en una interfaz)
export interface OrdersReducerStateInterface {
    // loadStatus: ProcessStatus;
    orders: GetOrdersPHPInterface['orders'];
}

// Reducer State (inicial) - Valores iniciales
// Normalmente es un objeto JS
const initialState: OrdersReducerStateInterface = {
    // Recordatorio: el Application State son los datos que son importantes para la aplicación y que influencian lo que se ve en la pantalla.
    // loadStatus: ProcessStatus.NOT_STARTED,
    orders: [],
};

export const ordersReducer = createReducer(
    initialState,

    // Alteramos el App State (inicial) usando la Action que sea.
    // MUCHO CUIDADO: nunca editar el state original. Siempre hacer una copia y devolver la copia.

    /** Get Orders Data Start Action **/
    // Side Effects asociados: getOrderDataSideEffect (toma los datos de la Orders desde la base de datos mediante un HTTP Request)
    on(OrdersActions.GetOrdersStart, (state, action) => ({
        /* Añadir un valor */
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** |-> Get Orders Data End Success Action **/
    on(OrdersActions.GetOrdersEndSuccess, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        // Cargar todos los datos desde la base de datos
        orders: action.ordersPayload,
    })),

    /** |-> Get Orders Data End Failure Action **/
    on(OrdersActions.GetOrdersEndFailure, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,
    })),

    /** Log Out Action **/
    // Log Out: Borrar datos de la Orders Store (orders)
    on(OrdersActions.LogOut, (state, action) => ({
        // El Reducer devuelve la App State ya alterada por la Action (aka Reduced State).

        // Copiamos el App State (inicial) (en todas las propiedades de state)
        ...state,

        orders: [],
    })),
);
