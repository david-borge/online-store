import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as PaymentMethodsActions from '../../store/payment-methods.actions';

import { GetPaymentMethodsPHPInterface } from 'projects/web/src/app/core/models/getPaymentMethodsPHP.interface';



@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  host: {
    class:'app-payment-methods--class-for-router-outlet',
  },
})
export class PaymentMethodsComponent {

  // Suscripciones a la Store
  paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  paymentMethods: GetPaymentMethodsPHPInterface['paymentMethods'] = [];
  showBottomOverlay: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {

    // Leer datos de la Global Store
    let userEmail = '';
    this.store.select("globalReducerObservable").subscribe(
      globalReducerData => {

        // Recuperar el email del usuario desde la Global Store
        userEmail = globalReducerData.user.email;

        // Leer las propiedades de BottomOverlay de la Global Store
        this.showBottomOverlay = globalReducerData.showBottomOverlay;

      }
    );

    // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
    this.store.dispatch( PaymentMethodsActions.GetPaymentMethodsStart({
      userEmailPayload: userEmail,
    }) );

    // Leer los datos de la Order de la Store para mostrarlos en la Template
    this.paymentMethodsReducerObservableSubscription = this.store.select('paymentMethodsReducerObservable').subscribe(
      paymentMethodsReducerData => {

        this.paymentMethods = paymentMethodsReducerData.paymentMethods;

        // Comprobacion
        // console.log('paymentMethods:');
        // console.log(this.paymentMethods);

      }
    );

  }

  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.paymentMethodsReducerObservableSubscription.unsubscribe();

  }

}
