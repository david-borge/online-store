import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { DateWithTitleComponent } from './components/date-with-title/date-with-title.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';

@NgModule({
    declarations: [DateWithTitleComponent, OrderComponent, OrderDetailComponent],
    imports: [CommonModule, CoreModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
