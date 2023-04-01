import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule,
  ],
  // Exportar RouterModule para poder importarlo en AppModule
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
