import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  host: {
    class:'app-payment-methods-classes-for-router-outlet'
  },
})
export class PaymentMethodsComponent {

  // TODO:
  numberOfPaymentMethods :number = 3;

}
