import { Component,Input } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../features/ecommerce/addresses/store/addresses.actions';

import { AddressInterface } from '../../../core/models/address.interface';
import { GetAddressesPHPInterface } from '../../../core/models/getAddressesPHP.interface';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {

  // Propiedades - Credit Card
  @Input() addressCardId         : AddressInterface["id"] = 0;
  @Input() addressCardFullName   : AddressInterface['fullName']  = "";
  @Input() addressCardAddress    : AddressInterface['address']  = "";
  @Input() addressCardPostalCode : AddressInterface['postalCode']  = "";
  @Input() addressCardCity       : AddressInterface['city']  = "";
  @Input() addressCardCountry    : GetAddressesPHPInterface['addresses'][0]['country']  = "";
  @Input() addressCardShowButton : boolean = false;
  @Input() addressCardIsDefault  : AddressInterface["isDefault"] = 0;
  @Input() addressArrayId        : number = 0;


  constructor(
    private store: Store<fromApp.AppState>,
  ) {}


  onClickAddressCardOrSelectButton() {

    // Change Default Address: cambiar el valor de isDefault en la Addresses Store: al seleccionar una, desactivar el resto
    this.store.dispatch( AddressesActions.ChangeDefaultAddress({
      addressArrayIdPayload     : this.addressArrayId,
    }) );

  }
  
}
