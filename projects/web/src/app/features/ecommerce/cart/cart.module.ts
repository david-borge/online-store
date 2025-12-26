import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
    declarations: [CartComponent],
    imports: [CartRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class CartModule {}
