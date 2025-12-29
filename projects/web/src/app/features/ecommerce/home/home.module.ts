import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, CoreModule, FormsModule, HomeRoutingModule, SharedModule],
    // Exportar RouterModule para poder importarlo en AppModule
    exports: [HomeComponent],
})
export class HomeModule {}
