import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { GetOrderDataPHPInterface } from 'projects/web/src/app/core/models/getOrderDataPHP.interface';

@Component({
  selector: 'app-checkout-step-order-review',
  templateUrl: './checkout-step-order-review.component.html',
  styleUrls: ['./checkout-step-order-review.component.scss']
})
export class CheckoutStepOrderReviewComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  orderReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  currentOrderNumber: number = 0;
  orderNumber: number = 0;
  orderData          : GetOrderDataPHPInterface['orderData']          = {} as GetOrderDataPHPInterface['orderData'];
  orderProducts      : GetOrderDataPHPInterface['orderProducts']      = [];
  orderAddress       : GetOrderDataPHPInterface['orderAddress']       = {} as GetOrderDataPHPInterface['orderAddress'];
  orderPaymentMethod : GetOrderDataPHPInterface['orderPaymentMethod'] = {} as GetOrderDataPHPInterface['orderPaymentMethod'];


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Leer currentOrderNumber de la Order Store
    this.orderReducerObservableSubscription = this.store.select('orderReducerObservable').subscribe( (orderReducerData) => {
      
      this.currentOrderNumber = orderReducerData.currentOrderNumber;
      this.orderData          = orderReducerData.orderData;
      this.orderProducts      = orderReducerData.orderProducts;
      this.orderAddress       = orderReducerData.orderAddress;
      this.orderPaymentMethod = orderReducerData.orderPaymentMethod;
      
    });

  }

  onClickPayNowButton() {

    this.router.navigate(['/checkout/order-confirmation']);

  }
  
  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.orderReducerObservableSubscription.unsubscribe();
    
  }

}
