import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesRoutingModule } from './addresses-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { AddressesComponent } from './pages/addresses/addresses.component';



@NgModule({
  declarations: [
    AddressesComponent
  ],
  imports: [
    CommonModule,

    AddressesRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class AddressesModule { }
