import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {
    class:'app-cart--class-for-router-outlet',
  },
})
export class CartComponent {

  // TODO:
  numberOfProductsInCart :number = 2;

}
