import { Component, Input, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { GetPaymentMethodsPHPInterface } from '../../../core/models/getPaymentMethodsPHP.interface';
import { PaymentMethodInterface } from '../../../core/models/paymentMethod.interface';
import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as PaymentMethodsActions from '../../../features/ecommerce/payment-methods/store/payment-methods.actions';

@Component({
    standalone: false,
    selector: 'app-credit-card',
    templateUrl: './credit-card.component.html',
    styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Propiedades - Credit Card
    @Input() cardId: PaymentMethodInterface['id'] = 0;
    @Input() cardType: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardType'] = 'visa';
    @Input() cardBankName: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardBankName'] =
        'Bank of America';
    @Input()
    cardPersonFullName: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardPersonFullName'] =
        '';
    @Input()
    cardLastFourNumbers: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardLastFourNumbers'] =
        '';
    @Input()
    cardExpirationMonth: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardExpirationMonth'] =
        '';
    @Input()
    cardExpirationYear: GetPaymentMethodsPHPInterface['paymentMethods'][0]['cardExpirationYear'] =
        '';
    @Input() creditCardShowButton = false;
    @Input() cardIsDefault: GetPaymentMethodsPHPInterface['paymentMethods'][0]['isDefault'] = 0;
    @Input() cardArrayId = 0;

    onClickCreditCardOrSelectButton() {
        // Change Default Credit Card: cambiar el valor de isDefault en la Payment Methods Store: al seleccionar una, desactivar el resto
        this.store.dispatch(
            PaymentMethodsActions.ChangeDefaultPaymentMethodStart({
                paymentMethodArrayIdPayload: this.cardArrayId,
                paymentMethodIdPayload: this.cardId,
            }),
        );
    }
}
