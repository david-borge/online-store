import { Component, Input, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { AddressInterface } from '../../../core/models/address.interface';
import { GetAddressesPHPInterface } from '../../../core/models/getAddressesPHP.interface';
import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../features/ecommerce/addresses/store/addresses.actions';


@Component({
    standalone: false,
    selector: 'app-address-card',
    templateUrl: './address-card.component.html',
    styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Propiedades - Credit Card
    @Input() addressCardId: AddressInterface['id'] = 0;
    @Input() addressCardFullName: AddressInterface['fullName'] = '';
    @Input() addressCardAddress: AddressInterface['address'] = '';
    @Input() addressCardPostalCode: AddressInterface['postalCode'] = '';
    @Input() addressCardCity: AddressInterface['city'] = '';
    @Input() addressCardCountry: GetAddressesPHPInterface['addresses'][0]['country'] = '';
    @Input() addressCardShowButton = false;
    @Input() addressCardIsDefault: AddressInterface['isDefault'] = 0;
    @Input() addressArrayId = 0;

    onClickAddressCardOrSelectButton() {
        // Change Default Address: cambiar el valor de isDefault en la Addresses Store y en la Base de Datos: al seleccionar una, desactivar el resto
        this.store.dispatch(
            AddressesActions.ChangeDefaultAddressStart({
                addressArrayIdPayload: this.addressArrayId,
                addressCardIdPayload: this.addressCardId,
            }),
        );
    }
}
