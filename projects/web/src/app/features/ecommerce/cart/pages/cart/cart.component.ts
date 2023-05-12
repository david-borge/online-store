import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as CartActions from '../../store/cart.actions';


import { GetCartDataPHPInterface } from 'projects/web/src/app/core/models/GetCartDataPHP.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {
    class:'app-cart--class-for-router-outlet',
  },
})
export class CartComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  cartReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  cartData : GetCartDataPHPInterface['cartData'] = [];


  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {

    // - Leer los datos del carrito desde la Base de Datos y guardarlos en la Cart Store
    this.store.dispatch( CartActions.GetCartDataStart() );

    // - Leer los datos del carrito desde la Cart Store
    this.store.select("cartReducerObservable").subscribe(
      cartReducerData => {
        this.cartData = cartReducerData.cartData;
      }
    );

  }

  ngOnDestroy() {
    this.cartReducerObservableSubscription.unsubscribe();
  }

}
