import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-checkout-product-card',
  templateUrl: './cart-checkout-product-card.component.html',
  styleUrls: ['./cart-checkout-product-card.component.scss']
})
export class CartCheckoutProductCardComponent {

  // TODO:
  theHobbitItemCount :number = 1;

  onClickMinusOrDeleteButton() {
    if( this.theHobbitItemCount > 1 ) {
      this.theHobbitItemCount--;
    } else {
      // TODO: borrar producto del array
    }
  }

  onClickPlusButton() {
    this.theHobbitItemCount++;
  }

}
