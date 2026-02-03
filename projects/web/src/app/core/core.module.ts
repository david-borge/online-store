import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { LoadingSpinnerComponent } from '@core/components/loading-spinner/loading-spinner.component';
import { SharedModule } from '@shared/shared.module';

import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

@NgModule({
    declarations: [FooterComponent, HeaderComponent, LoadingSpinnerComponent],
    imports: [CommonModule, CurrencyFormatPipe, RouterModule, SharedModule],
    exports: [CurrencyFormatPipe, FooterComponent, HeaderComponent, LoadingSpinnerComponent],
    providers: [CurrencyPipe],
})
export class CoreModule {}
