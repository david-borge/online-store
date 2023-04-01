import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    SectionHeaderComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],

  // Añadir a exports todo lo que haya puesto en declarations e imports, para que esté disponible en los otros módulos que van a usar las cosas de SharedModule.
  exports: [
    SectionHeaderComponent,
    ProductCardComponent,
  ],

})
export class SharedModule { }
