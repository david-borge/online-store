import { Component, Input } from '@angular/core';

import { AddressInterface } from '../../../core/models/address.interface';

@Component({
    standalone: false,
    selector: 'app-select-button',
    templateUrl: './select-button.component.html',
    styleUrls: ['./select-button.component.scss'],
})
export class SelectButtonComponent {
    // Propiedades - Credit Card
    @Input() selectButtonSelected: AddressInterface['isDefault'] = 0;
}
