import { Component, OnDestroy } from '@angular/core';

import { Subscription, take } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Component({
    standalone: false,
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnDestroy {
    // Suscripciones a la Store
    orderReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    currentOrderNumber: number = 0;

    constructor(private store: Store<fromApp.AppState>) {}

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
