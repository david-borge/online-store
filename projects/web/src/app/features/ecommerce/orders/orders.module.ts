import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { OrdersComponent } from './pages/orders/orders.component';

@NgModule({
    declarations: [OrdersComponent],
    imports: [CommonModule, OrdersRoutingModule, CoreModule, SharedModule],
})
export class OrdersModule {}
