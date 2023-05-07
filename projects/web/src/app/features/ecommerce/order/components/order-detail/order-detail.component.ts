import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as OrderActions from '../../store/order.actions';

import { OrderInterface } from 'projects/web/src/app/core/models/order.interface';
import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';
import { AddressInterface } from 'projects/web/src/app/core/models/address.interface';
import { PaymentMethodInterface } from 'projects/web/src/app/core/models/paymentMethod.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  // Suscripciones a la Store
  orderReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  orderNumber: number = 0;
  orderData         : any   = {} as any;
  orderProducts     : any[] = [];
  orderAddress      : any   = {} as any;
  orderPaymentMethod: any   = {} as any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {

    // Order number (Route Parameter: order-number)
    this.orderNumber = this.route.snapshot.params['order-number'];

    // Comprobacion
    // console.log('orderNumber: ' + this.orderNumber);

    // Guardar orderNumber a la Order Store
    this.store.dispatch( OrderActions.SaveCurrentOrderSlug({
      currentOrderSlugPayload: this.orderNumber,
    }) );

    // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
    this.store.dispatch( OrderActions.GetOrderDataStart({
      orderNumberPayload: this.orderNumber,
    }) );

    // Leer los datos de la Order de la Store para mostrarlos en la Template
    this.orderReducerObservableSubscription = this.store.select('orderReducerObservable').subscribe(
      orderReducerData => {

        this.orderData          = orderReducerData.orderData;
        this.orderProducts      = orderReducerData.orderProducts;
        this.orderAddress       = orderReducerData.orderAddress;
        this.orderPaymentMethod = orderReducerData.orderPaymentMethod;

      }
    );

  }

}
