import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../core/store/global.actions';

import { AccountService } from '../../../core/services/account/account.service';

import { AddressInterface } from '../../../core/models/address.interface';


@Component({
  selector: 'app-bottom-overlay',
  templateUrl: './bottom-overlay.component.html',
  styleUrls: ['./bottom-overlay.component.scss']
})
export class BottomOverlayComponent {

  // Propiedades - Bottom Overlay
  @Input() bottomOverlayTitle         : string  = '';
  @Input() bottomOverlayAddButtonText : string  = '';
  @Input() bottomOverlayBodyContent   : ('' | 'ADD_NEW_ADDRESS' | 'ADD_NEW_PAYMENT_METHOD')  = '';

  // Propiedades - Bottom Overlay - ADD_NEW_ADDRESS
  newAddress: AddressInterface = {} as AddressInterface;


  constructor(
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
  ) {}

  hideBottomOverlay() {
    this.store.dispatch( GlobalActions.ShowOrHideBottomOverlay({
      showBottomOverlayValue: false,
    }) );
  }

  onClickAddButton() {

    // Ejecuto una acción u otra dependiendo de en qué página estoy

    // Comprobacion
    // console.log('bottomOverlayBodyContent: ' + this.bottomOverlayBodyContent);
    
    // · Página de Delivery addresses: añadir al carrito
    switch ( this.bottomOverlayBodyContent ) {

      // Add new address
      case 'ADD_NEW_ADDRESS':
        this.accountService.addNewAddress();
        break;

      // Add new payment method
      case 'ADD_NEW_PAYMENT_METHOD':
        this.accountService.addNewPaymentMethod();
        break;
    
      default:
        break;

    }

    // Navegación
    // this.router.navigate([ this.navigationButtonRightURL ]);

  }

}
