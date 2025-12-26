import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';


import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Component({
    standalone: false,
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnDestroy, OnInit {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    orderReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    currentOrderNumber = 0;

    ngOnInit(): void {
        // Leer currentOrderNumber de la Order Store
        this.orderReducerObservableSubscription = this.store
            .select('orderReducerObservable')
            .subscribe((orderReducerData) => {
                this.currentOrderNumber = orderReducerData.currentOrderNumber;
            });
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.orderReducerObservableSubscription.unsubscribe();
    }
}
