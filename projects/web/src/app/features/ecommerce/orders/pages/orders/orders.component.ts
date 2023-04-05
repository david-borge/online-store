import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  host: {
    class:'app-orders-classes-for-router-outlet'
  },
})
export class OrdersComponent {

  // TODO:
  numberOfOrders :number = 3;

}
