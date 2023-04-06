import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  // Propiedades - Product Card
  @Input() product = {} as ProductInterface;
  @Input() productCardTypeClass: string = 'product-card-featured'; // product-card-featured, product-card-small, product-card-order

}
