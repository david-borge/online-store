import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './pages/product/product.component';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,

    ProductRoutingModule
  ]
})
export class ProductModule { }
