import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {

  // Propiedades - Credit Card
  @Input() addressCardSelected   :boolean = false;
  @Input() addressCardPersonName :string  = "";
  @Input() addressCardAddress    :string  = "";
  @Input() addressCardPostalCode :string  = "";
  @Input() addressCardCity       :string  = "";
  @Input() addressCardCountry     :string  = "";
  @Input() addressCardShowButton :boolean = false;

}
