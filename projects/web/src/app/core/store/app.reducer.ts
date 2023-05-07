/*** appReducer ***/
// Agrupa todos los Reducers de la aplicación
/* Un Reducer es una función JS, que recibe como input:
    · El App State actual (o inicial) (desde la Store central),
    · La Action que queremos ejecutar.
    Los Reducers solo pueden ejecutar código síncrono, por lo que no se puede hacer una HTTP Request desde un Reducer, eso se hace en las Action. */



import { ActionReducerMap } from '@ngrx/store';

import * as fromGlobal from './global.reducer';
import * as fromHome from '../../features/ecommerce/home/store/home.reducer';
import * as fromCategories from '../../features/ecommerce/categories/store/categories.reducer';
import * as fromProduct from '../../features/ecommerce/product/store/product.reducer';
import * as fromOrder from '../../features/ecommerce/order/store/order.reducer';
import * as fromOrders from '../../features/ecommerce/orders/store/orders.reducer';
import * as fromAddresses from '../../features/ecommerce/addresses/store/addresses.reducer';
import * as fromPaymentMethods from '../../features/ecommerce/payment-methods/store/payment-methods.reducer';



// App State (inicial) - Tipos (definidos en una interfaz)
// Cojo los tipos de las interfaces de los demás Reducers
export interface AppState {
    globalReducerObservable: fromGlobal.GlobalReducerStateInterface;
    homeReducerObservable: fromHome.HomeReducerStateInterface;
    categoriesReducerObservable: fromCategories.CategoriesReducerStateInterface;
    productReducerObservable: fromProduct.ProductReducerStateInterface;
    orderReducerObservable: fromOrder.OrderReducerStateInterface;
    ordersReducerObservable: fromOrders.OrdersReducerStateInterface;
    addressesReducerObservable: fromAddresses.AddressesReducerStateInterface;
    paymentMethodsReducerObservable: fromPaymentMethods.PaymentMethodsReducerStateInterface;
}


// Action Reducer Map
// Un objeto JS con la lista de Reducers de la app ({identificadorQueQuiera: MiReducerAsociadoAlIdentificador})
export const appReducer: ActionReducerMap<AppState> = {
    globalReducerObservable: fromGlobal.globalReducer,
    homeReducerObservable: fromHome.homeReducer,
    categoriesReducerObservable: fromCategories.categoriesReducer,
    productReducerObservable: fromProduct.productReducer,
    orderReducerObservable: fromOrder.orderReducer,
    ordersReducerObservable: fromOrders.ordersReducer,
    addressesReducerObservable: fromAddresses.addressesReducer,
    paymentMethodsReducerObservable: fromPaymentMethods.paymentMethodsReducer,
};