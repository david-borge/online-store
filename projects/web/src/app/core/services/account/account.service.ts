import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../features/ecommerce/addresses/store/addresses.actions';

import { AddressInterface } from '../../models/address.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  newAddress: {
    fullName   : AddressInterface["fullName"],
    address    : AddressInterface["address"],
    postalCode : AddressInterface["postalCode"],
    city       : AddressInterface["city"],
    countryId  : AddressInterface["countryId"],
  } = { fullName: '', address: '', postalCode: '', city: '', countryId: 0};

  constructor(
    private store: Store<fromApp.AppState>,
  ) {

    // Leer datos de la Addresses Store
    this.store.select("addressesReducerObservable").subscribe(
      addressesReducerData => {

        this.newAddress = addressesReducerData.newAddress;

      }
    );

  }

  addNewAddress() {

    this.store.dispatch( AddressesActions.AddNewAddressStart({
      newAddressPayload: this.newAddress,
    }) );
    
  }

  addNewPaymentMethod() {

  }
  
}
