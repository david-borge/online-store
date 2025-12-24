import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../core/store/global.actions';

import { AccountService } from '../../../core/services/account/account.service';

import { AddressInterface } from '../../../core/models/address.interface';
import { ProcessStatusInterface } from '../../../core/models/processStatus.interface';
import { FormControlStatus } from '@angular/forms';

@Component({
    selector: 'app-bottom-overlay',
    templateUrl: './bottom-overlay.component.html',
    styleUrls: ['./bottom-overlay.component.scss'],
})
export class BottomOverlayComponent implements OnInit, OnDestroy {
    // Suscripciones a la Store
    addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;
    paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Propiedades - Bottom Overlay
    @Input() bottomOverlayTitle: string = '';
    @Input() bottomOverlayAddButtonText: string = '';
    @Input() bottomOverlayBodyContent: '' | 'ADD_NEW_ADDRESS' | 'ADD_NEW_PAYMENT_METHOD' = '';
    processStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';

    // Propiedades - Bottom Overlay - ADD_NEW_ADDRESS
    newAddress: AddressInterface = {} as AddressInterface;

    // Propiedades - Bottom Overlay - ADD_NEW_PAYMENT_METHOD
    isAddNewCardFormValid: boolean = false;

    constructor(
        private store: Store<fromApp.AppState>,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        // Add new address
        if (this.bottomOverlayBodyContent == 'ADD_NEW_ADDRESS') {
            this.addressesReducerObservableSubscription = this.store
                .select('addressesReducerObservable')
                .subscribe((addressReducerData) => {
                    // processStatus
                    this.processStatus = addressReducerData.addNewAddressStatus;

                    // bottomOverlayAddButtonText
                    if (this.processStatus == 'STARTED') {
                        this.bottomOverlayAddButtonText = 'Adding...';
                    }
                });
        }

        // Add new card
        else if (this.bottomOverlayBodyContent == 'ADD_NEW_PAYMENT_METHOD') {
            this.paymentMethodsReducerObservableSubscription = this.store
                .select('paymentMethodsReducerObservable')
                .subscribe((paymentMethodsReducerData) => {
                    // processStatus
                    this.processStatus = paymentMethodsReducerData.addNewCardStatus;

                    // bottomOverlayAddButtonText
                    if (this.processStatus == 'STARTED') {
                        this.bottomOverlayAddButtonText = 'Adding...';
                    }
                });
        }
    }

    hideBottomOverlay() {
        // Solo permitir cerrar el overlay si no estoy en medio de un proceso (añadir una address o credit card)
        if (this.processStatus != 'STARTED') {
            this.store.dispatch(
                GlobalActions.ShowOrHideBottomOverlay({
                    showBottomOverlayValue: false,
                }),
            );
        }
    }

    onClickAddButton() {
        // Ejecuto una acción u otra dependiendo de en qué página estoy

        // Comprobacion
        // console.log('bottomOverlayBodyContent: ' + this.bottomOverlayBodyContent);

        // · Página de Delivery addresses: añadir al carrito
        switch (this.bottomOverlayBodyContent) {
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

    checkIsAddNewAddressOrCardFormValid(eventData: FormControlStatus) {
        // Comprobacion
        // console.log('eventData: ' + eventData);

        if (eventData == 'VALID') {
            this.isAddNewCardFormValid = true;
        } else {
            this.isAddNewCardFormValid = false;
        }
    }

    ngOnDestroy() {
        this.addressesReducerObservableSubscription.unsubscribe();
        this.paymentMethodsReducerObservableSubscription.unsubscribe();
    }
}
