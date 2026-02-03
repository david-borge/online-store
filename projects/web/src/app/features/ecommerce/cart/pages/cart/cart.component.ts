import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetCartDataPHPInterface } from '@core/models/GetCartDataPHP.interface';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CartActions from '@features/ecommerce/cart/store/cart.actions';

@Component({
    standalone: false,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    host: {
        class: 'app-cart--class-for-router-outlet',
    },
})
export class CartComponent implements OnInit, OnDestroy {
    private readonly store = inject<Store<fromApp.AppState>>(Store);
    private readonly titleService = inject(Title);

    // Suscripciones a la Store
    cartReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    cartData: GetCartDataPHPInterface['cartData'] = [];
    cartTotal = 0;

    ngOnInit() {
        // - Leer los datos del carrito desde la Base de Datos y guardarlos en la Cart Storeº
        this.store.dispatch(CartActions.GetCartDataStart());

        // - Leer los datos del carrito desde la Cart Store
        this.cartReducerObservableSubscription = this.store
            .select('cartReducerObservable')
            .subscribe((cartReducerData) => {
                // Cart Data (el listado de productos con sus cantidades)
                this.cartData = cartReducerData.cartData;

                // Cart total
                this.cartTotal = 0; // Reseteo el valor para que no se sume al total anterior cada vez que se ha un cambio en el listado de productos o en las cantidades
                this.cartData.map((product) => {
                    this.cartTotal += product.price * product.productQuantity;
                });
            });

        // - Cambiar el título de la página
        this.titleService.setTitle('Cart - Online Store');
    }

    ngOnDestroy() {
        this.cartReducerObservableSubscription.unsubscribe();
    }
}
