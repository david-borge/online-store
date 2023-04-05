import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';



@NgModule({
  declarations: [
    PaymentMethodsComponent
  ],
  imports: [
    CommonModule,

    PaymentMethodsRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class PaymentMethodsModule { }
