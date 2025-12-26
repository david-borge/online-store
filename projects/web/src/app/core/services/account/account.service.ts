import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../features/ecommerce/addresses/store/addresses.actions';
import * as PaymentMethodsActions from '../../../features/ecommerce/payment-methods/store/payment-methods.actions';
import { AddressInterface } from '../../models/address.interface';
import { GetAddressesPHPInterface } from '../../models/getAddressesPHP.interface';
import { PaymentMethodInterface } from '../../models/paymentMethod.interface';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    newAddress: {
        fullName: AddressInterface['fullName'];
        address: AddressInterface['address'];
        postalCode: AddressInterface['postalCode'];
        city: AddressInterface['city'];
        countryId: AddressInterface['countryId'];
    } = {
        fullName: '',
        address: '',
        postalCode: '',
        city: '',
        countryId: 0,
    };

    newAddressCountryName: GetAddressesPHPInterface['addresses'][0]['country'] | undefined = '';

    newCard: {
        type: PaymentMethodInterface['type'];
        cardBankName: PaymentMethodInterface['cardBankName'];
        cardPersonFullName: PaymentMethodInterface['cardPersonFullName'];
        cardNumber: PaymentMethodInterface['cardNumber'];
        cardExpirationMonth: PaymentMethodInterface['cardExpirationMonth'];
        cardExpirationYear: PaymentMethodInterface['cardExpirationYear'];
        cardType: PaymentMethodInterface['cardType'];
    } = {
        type: 'card',
        cardBankName: 'Bank of America', // 'Bank of America' | 'Goldman Sachs' | 'Citigroup' | 'Wells Fargo' | 'Capital One Financial'
        cardPersonFullName: '',
        cardNumber: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        cardType: 'visa',
    };

    constructor(private store: Store<fromApp.AppState>) {
        // Leer datos de la Addresses Store
        this.store.select('addressesReducerObservable').subscribe((addressesReducerData) => {
            this.newAddress = addressesReducerData.newAddress;
            this.newAddressCountryName = addressesReducerData.newAddressCountryName;
        });

        // Leer datos de la Payment Method Store
        this.store
            .select('paymentMethodsReducerObservable')
            .subscribe((paymentMethodsReducerData) => {
                this.newCard = paymentMethodsReducerData.newCard;
            });
    }

    addNewAddress() {
        this.store.dispatch(
            AddressesActions.AddNewAddressStart({
                newAddressPayload: this.newAddress,
                newAddressCountryNamePayload: this.newAddressCountryName,
            }),
        );
    }

    addNewPaymentMethod() {
        this.store.dispatch(
            PaymentMethodsActions.AddNewCardStart({
                newCardPayload: this.newCard,
            }),
        );
    }
}
