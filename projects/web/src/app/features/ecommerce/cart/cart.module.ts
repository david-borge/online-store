import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { CartComponent } from './pages/cart/cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,

    CartRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class CartModule { }
