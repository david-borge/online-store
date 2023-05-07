import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-checkout-product-card',
  templateUrl: './cart-checkout-product-card.component.html',
  styleUrls: ['./cart-checkout-product-card.component.scss']
})
export class CartCheckoutProductCardComponent {

  // Propiedades - Cart and Checkout Product Card - Product
  @Input() productImageThumbnail : string = '';
  @Input() productName           : string = '';
  @Input() productPrice          : number = 0;
  @Input() productQuantity       : number = 0;

  // Propiedades - Cart and Checkout Product Card - Navigation CTAs & Copy
  @Input() cartCheckoutProductCardShowButtons :boolean = true;

  onClickMinusOrDeleteButton() {
    if( this.productQuantity > 1 ) {
      this.productQuantity--;
    } else {
      // TODO: borrar producto del array
    }
  }

  onClickPlusButton() {
    this.productQuantity++;
  }

}
