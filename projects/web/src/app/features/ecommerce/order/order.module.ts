import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { DateWithTitleComponent } from './components/date-with-title/date-with-title.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailComponent,
    DateWithTitleComponent
  ],
  imports: [
    CommonModule,

    OrderRoutingModule,
    
    CoreModule,
    SharedModule,
  ]
})
export class OrderModule { }
