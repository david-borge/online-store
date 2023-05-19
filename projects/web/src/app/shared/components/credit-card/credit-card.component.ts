import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {

  // Propiedades - Credit Card
  @Input() cardSelected         :number = 0;
  @Input() cardType             :string  = "";
  @Input() cardBankName         :string  = "";
  @Input() cardPersonFullName   :string  = "";
  @Input() cardLastFourNumbers  :string  = "";
  @Input() cardExpirationMonth  :string  = "";
  @Input() cardExpirationYear   :string  = "";
  @Input() creditCardShowButton :boolean = false;

}
