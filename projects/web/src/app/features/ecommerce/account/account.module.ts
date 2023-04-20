import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { AccountComponent } from './pages/account/account.component';
import { AccountCardComponent } from './components/account-card/account-card.component';



@NgModule({
  declarations: [
    AccountComponent,
    AccountCardComponent
  ],
  imports: [
    CommonModule,

    AccountRoutingModule,

    CoreModule,
    SharedModule,
  ]
})
export class AccountModule { }
