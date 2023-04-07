import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CoreModule } from '../../../core/core.module';

import { ProductComponent } from './pages/product/product.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';

import { environment } from 'projects/web/src/environments/environment.development';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,

    ProductRoutingModule,

    CoreModule,
    SharedModule,
    
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: environment.svgIconsConfigFile,
    }),
  ]
})
export class ProductModule { }
