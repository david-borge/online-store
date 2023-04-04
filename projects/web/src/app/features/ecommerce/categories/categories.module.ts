import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesComponent } from './pages/categories/categories.component';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,

    CategoriesRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class CategoriesModule { }
