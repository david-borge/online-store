import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from '../../../core/core.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    HomeRoutingModule,
    
    CoreModule,
    SharedModule,
  ],
  // Exportar RouterModule para poder importarlo en AppModule
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
