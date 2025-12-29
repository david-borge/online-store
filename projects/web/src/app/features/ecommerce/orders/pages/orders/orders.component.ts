import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetOrdersPHPInterface } from '@core/models/getOrdersPHP.interface';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as OrdersActions from '@features/ecommerce/orders/store/orders.actions';

@Component({
    standalone: false,
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    host: {
        class: 'app-orders--class-for-router-outlet',
    },
})
export class OrdersComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    ordersReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    activeOrders: GetOrdersPHPInterface['orders'] = [];
    previousOrders: GetOrdersPHPInterface['orders'] = [];

    ngOnInit(): void {
        // Recuperar el email del usuario desde la Global Store
        let userEmail = '';
        this.store.select('globalReducerObservable').subscribe((globalReducerData) => {
            userEmail = globalReducerData.user.email;
        });

        // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
        this.store.dispatch(
            OrdersActions.GetOrdersStart({
                userEmailPayload: userEmail,
            }),
        );

        // Leer los datos de la Order de la Store para mostrarlos en la Template
        this.ordersReducerObservableSubscription = this.store
            .select('ordersReducerObservable')
            .subscribe((ordersReducerData) => {
                // Reset the arrays so that the current result is not added to the previous ones
                this.activeOrders = [];
                this.previousOrders = [];

                ordersReducerData.orders.filter((order) => {
                    // Active Orders
                    // CUIDADO: no puedo usar la columna active porque no tengo un sistema en el que ese valor cambie a 1 cuando el paquete ha sido entregado
                    if (new Date(order.deliveryFullDate) > new Date()) {
                        this.activeOrders.push(order);
                    }

                    // Previous orders
                    else {
                        this.previousOrders.push(order);
                    }
                });

                // Comprobacion
                // console.log('activeOrders:');
                // console.log(this.activeOrders);

                // console.log('previousOrders:');
                // console.log(this.previousOrders);
            });
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.ordersReducerObservableSubscription.unsubscribe();
    }
}
