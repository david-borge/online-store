import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  // Propiedades - Product Card
  @Input() productCardURL: string = '';

  // Propiedades - Product Card - Featured
  @Input() productCardTypeClass: string = 'product-card-featured'; // product-card-featured, product-card-small, product-card-order

}
