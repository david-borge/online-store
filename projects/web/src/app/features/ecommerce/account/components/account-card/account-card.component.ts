import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-account-card',
    templateUrl: './account-card.component.html',
    styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
    // Propiedades - Account Card
    // @Input() accountCardIcon  :string = '';
    @Input() accountCardTitle = '';
    @Input() accountCardURL = '';
}
