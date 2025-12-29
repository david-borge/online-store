import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesComponent } from './pages/addresses/addresses.component';

@NgModule({
    declarations: [AddressesComponent],
    imports: [AddressesRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class AddressesModule {}
