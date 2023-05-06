import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as OrderActions from '../../store/order.actions';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  // Template variables
  orderNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {

    // Order number (Route Parameter: order-number)
    this.orderNumber = this.route.snapshot.params['order-number'];

    // Comprobacion
    // console.log('orderNumber: ' + this.orderNumber);

    // Guardar orderNumber a la Order Store
    this.store.dispatch( OrderActions.SaveCurrentOrderSlug({
      currentOrderSlugPayload: this.orderNumber,
    }) );

    // Recuperar los datos de la Order de la Base de Datos
    this.store.dispatch( OrderActions.GetOrderDataStart({
      orderNumberPayload: this.orderNumber,
    }) );

  }

}
