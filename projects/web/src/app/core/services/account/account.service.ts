import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../features/ecommerce/addresses/store/addresses.actions';

import { AddressInterface } from '../../models/address.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  addNewAddress(newAddress: AddressInterface) {

    this.store.dispatch( AddressesActions.AddNewAddresStart({
      newAddress: newAddress,
    }) );
    
  }

  addNewPaymentMethod() {

  }
  
}
