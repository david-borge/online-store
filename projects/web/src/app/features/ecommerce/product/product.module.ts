import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CoreModule } from '../../../core/core.module';

import { ProductComponent } from './pages/product/product.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,

    ProductRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class ProductModule { }
