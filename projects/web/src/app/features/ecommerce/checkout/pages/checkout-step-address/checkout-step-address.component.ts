import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../../../core/store/global.actions';
import * as AddressesActions from '../../../addresses/store/addresses.actions';

import { GetAddressesPHPInterface } from 'projects/web/src/app/core/models/getAddressesPHP.interface';

@Component({
  selector: 'app-checkout-step-address',
  templateUrl: './checkout-step-address.component.html',
  styleUrls: ['./checkout-step-address.component.scss'],
  host: {
    class:'app-checkout-step-address--class-for-router-outlet',
  },
})
export class CheckoutStepAddressComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  addresses: GetAddressesPHPInterface["addresses"] = [];
  showBottomOverlay: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // Leer datos de la Global Store
    let userEmail = '';
    let totalNumberOfSteps = 0;
    this.store.select("globalReducerObservable").subscribe(
      globalReducerData => {

        // Recuperar el email del usuario desde la Global Store
        userEmail = globalReducerData.user.email;

        // Leer las propiedades de BottomOverlay de la Global Store
        this.showBottomOverlay = globalReducerData.showBottomOverlay;

        // Leer totalNumberOfSteps de la Global Store
        totalNumberOfSteps = globalReducerData.checkoutSteps.totalNumberOfSteps;

      }
    );

    // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
    this.store.dispatch( AddressesActions.GetAddressesStart({
      userEmailPayload: userEmail,
    }) );

    // Leer los datos de la Order de la Store para mostrarlos en la Template
    this.addressesReducerObservableSubscription = this.store.select('addressesReducerObservable').subscribe(
      addressesReducerData => {

        this.addresses = addressesReducerData.addresses;

        // Comprobacion
        // console.log('addresses:');
        // console.log(this.addresses);

      }
    );

    // Resetar el valor de currentStep en la Global Store (volver a ponerlo en 1)
    // Esto es por si ya he hecho algún pedido durante esta sesión
    this.store.dispatch( GlobalActions.ResetCurrentStepValue() );

  }

  onClickAddNewAddressButton() {

    // Mostrar el "Add new address" overlay
    this.store.dispatch( GlobalActions.ShowOrHideBottomOverlay({
      showBottomOverlayValue: true,
    }) );
    
  }

  onClickPaymentButton() {

    this.store.dispatch( GlobalActions.ChangeCurrentStepValue({
      amount: 1,
    }) );

    this.router.navigate(['/checkout/payment-method']);

  }

  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.addressesReducerObservableSubscription.unsubscribe();

  }

}
