import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
    declarations: [ProductComponent, ProductDetailComponent],
    imports: [CommonModule, CoreModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
