import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as OrderActions from '../../../order/store/order.actions';

import { GetOrderDataPHPInterface } from 'projects/web/src/app/core/models/getOrderDataPHP.interface';

@Component({
  selector: 'app-checkout-step-order-review',
  templateUrl: './checkout-step-order-review.component.html',
  styleUrls: ['./checkout-step-order-review.component.scss']
})
export class CheckoutStepOrderReviewComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  orderReducerObservableSubscription: Subscription = Subscription.EMPTY;
  cartReducerObservableSubscription: Subscription = Subscription.EMPTY;
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;
  paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  currentOrderNumber: number = 0;
  orderNumber: number = 0;
  orderData          : GetOrderDataPHPInterface['orderData']          = {} as GetOrderDataPHPInterface['orderData'];
  orderProducts      : GetOrderDataPHPInterface['orderProducts']      = [];
  orderAddress       : GetOrderDataPHPInterface['orderAddress']       = {} as GetOrderDataPHPInterface['orderAddress'];
  orderPaymentMethod : GetOrderDataPHPInterface['orderPaymentMethod'] = {} as GetOrderDataPHPInterface['orderPaymentMethod'];
  orderTotal         : number = 0;


  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {

    // Leer currentOrderNumber de la Order Store
    this.orderReducerObservableSubscription = this.store.select('orderReducerObservable').subscribe( (orderReducerData) => {
      
      this.currentOrderNumber = orderReducerData.currentOrderNumber;
      this.orderData          = orderReducerData.orderData;
      
      
    });

    // Leer orderProducts de la Cart Store y calcular orderTotal (a partir del precio y la cantidad de los productos, datos que están en orderProducts)
    this.cartReducerObservableSubscription = this.store.select('cartReducerObservable').subscribe( (cartReducerData) => {

      // Leer orderProducts de la Cart Store
      this.orderProducts = cartReducerData.cartData;

      // Comprobacion
      // console.log('orderProducts:');
      // console.log(this.orderProducts);

      // Calcular orderTotal (a partir del precio y la cantidad de los productos, datos que están en orderProducts)
      this.orderProducts.map( orderProduct => {
        this.orderTotal += (orderProduct.price * orderProduct.productQuantity);
      });
      
    });

    // Leer orderAddress de la Addresses Store
    this.addressesReducerObservableSubscription = this.store.select('addressesReducerObservable').subscribe( (addressesReducerData) => {
      
      // orderAddress será la address donde isDefault sea 1
      for (const address of addressesReducerData.addresses) {
        if (address.isDefault === 1) {
          this.orderAddress = address;
          break;
        }
      }
      
    });

    // Leer orderPaymentMethod de la Payment Methods Store
    this.paymentMethodsReducerObservableSubscription = this.store.select('paymentMethodsReducerObservable').subscribe( (paymentMethodsReducerData) => {
      
      // orderPaymentMethod será la payment method donde isDefault sea 1
      for (const paymentMethod of paymentMethodsReducerData.paymentMethods) {
        if (paymentMethod.isDefault === 1) {
          this.orderPaymentMethod = paymentMethod;
          break;
        }
      }
      
    });

  }

  onClickPayNowButton() {

    // Guardar la Order en la Base de Datos
    this.store.dispatch( OrderActions.SaveOrderStart({
      orderFullDatePayload   : new Date().toString(), // Ahora
      deliveryFullDatePayload: new Date(new Date().setDate(new Date().getDate() + 1)).toString(), // Mañana
      addressIdPayload       : this.orderAddress.id,
      paymentMethodIdPayload : this.orderPaymentMethod.id,
    }) );

  }
  
  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.orderReducerObservableSubscription.unsubscribe();
    this.cartReducerObservableSubscription.unsubscribe();
    this.addressesReducerObservableSubscription.unsubscribe();
    this.paymentMethodsReducerObservableSubscription.unsubscribe();
    
  }

}
