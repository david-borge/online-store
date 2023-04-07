import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

import { AccountComponent } from './pages/account/account.component';
import { AccountCardComponent } from './components/account-card/account-card.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';

import { environment } from 'projects/web/src/environments/environment.development';


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

    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: environment.svgIconsConfigFile,
    }),
  ]
})
export class AccountModule { }
