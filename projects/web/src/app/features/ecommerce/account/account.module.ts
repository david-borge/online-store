import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
    declarations: [AccountCardComponent, AccountComponent],
    imports: [AccountRoutingModule, CommonModule, CoreModule, SharedModule],
})
export class AccountModule {}
