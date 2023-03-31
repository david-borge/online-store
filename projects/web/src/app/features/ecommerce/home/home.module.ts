import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,

    HomeRoutingModule,
  ],
  // Exportar RouterModule para poder importarlo en AppModule
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
