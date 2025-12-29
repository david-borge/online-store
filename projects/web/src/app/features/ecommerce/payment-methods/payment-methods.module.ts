import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';

@NgModule({
    declarations: [PaymentMethodsComponent],
    imports: [CommonModule, CoreModule, PaymentMethodsRoutingModule, SharedModule],
})
export class PaymentMethodsModule {}
