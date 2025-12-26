import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';

@NgModule({
    declarations: [OrdersComponent],
    imports: [CommonModule, CoreModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
