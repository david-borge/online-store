import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {

  // Propiedades - Credit Card
  @Input() creditCardSelected        :boolean = false;
  @Input() creditCardType            :string  = "";
  @Input() creditCardBankName        :string  = "";
  @Input() creditCardPersonName      :string  = "";
  @Input() creditCardLastFourNumbers :string  = "";
  @Input() creditCardExpirationDate  :string  = "";
  @Input() creditCardShowButton      :boolean = false;

}
