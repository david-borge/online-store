import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetOrderDataPHPInterface } from '@core/models/getOrderDataPHP.interface';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as OrderActions from '@features/ecommerce/order/store/order.actions';

@Component({
    standalone: false,
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    orderReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    orderNumber = 0;
    orderData: GetOrderDataPHPInterface['orderData'] = {} as GetOrderDataPHPInterface['orderData'];
    orderProducts: GetOrderDataPHPInterface['orderProducts'] = [];
    orderAddress: GetOrderDataPHPInterface['orderAddress'] =
        {} as GetOrderDataPHPInterface['orderAddress'];
    orderPaymentMethod: GetOrderDataPHPInterface['orderPaymentMethod'] =
        {} as GetOrderDataPHPInterface['orderPaymentMethod'];

    ngOnInit(): void {
        // Order number (Route Parameter: order-number)
        this.orderNumber = this.route.snapshot.params['order-number'];

        // Comprobacion
        // console.log('orderNumber: ' + this.orderNumber);

        // Guardar orderNumber a la Order Store
        this.store.dispatch(
            OrderActions.SaveCurrentOrderSlug({
                currentOrderSlugPayload: this.orderNumber,
            }),
        );

        // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
        this.store.dispatch(
            OrderActions.GetOrderDataStart({
                orderNumberPayload: this.orderNumber,
            }),
        );

        // Leer los datos de la Order de la Store para mostrarlos en la Template
        this.orderReducerObservableSubscription = this.store
            .select('orderReducerObservable')
            .subscribe((orderReducerData) => {
                this.orderData = orderReducerData.orderData;
                this.orderProducts = orderReducerData.orderProducts;
                this.orderAddress = orderReducerData.orderAddress;
                this.orderPaymentMethod = orderReducerData.orderPaymentMethod;
            });
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.orderReducerObservableSubscription.unsubscribe();
    }
}
