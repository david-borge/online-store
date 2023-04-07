import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductInterface } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-card-name *)
})
export class ProductCardComponent {

  // Propiedades - Product Card
  @Input() product = {} as ProductInterface;
  @Input() productCardTypeClass: string = 'product-card-featured'; // product-card-featured, product-card-small, product-card-order
  @Input() productCardProductNameTitleHeadingTag: string = 'h2';
  productCardTitleHeadingTagInnerHTML: string = '';

  ngOnInit(): void {

    // Product Card Name HTML
    this.productCardTitleHeadingTagInnerHTML = '<' + this.productCardProductNameTitleHeadingTag + '>' + this.product.name + '</' + this.productCardProductNameTitleHeadingTag + '>';


    // TODO: si es una Order
    if( this.productCardTypeClass == 'product-card-order' ) {
      this.product.imageThumbnail = 'assets/img/products/dualsense-wireless-controller';
      this.product.price          = 82.19;
    }

  }

}
