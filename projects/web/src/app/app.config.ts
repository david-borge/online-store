import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromApp from '@core/store/app.reducer';
import { GlobalEffects } from '@core/store/global.effects';
import { AddressesEffects } from '@features/ecommerce/addresses/store/addresses.effects';
import { CartEffects } from '@features/ecommerce/cart/store/cart.effects';
import { CategoriesEffects } from '@features/ecommerce/categories/store/categories.effects';
import { HomeEffects } from '@features/ecommerce/home/store/home.effects';
import { LoadingScreenEffects } from '@features/ecommerce/loading-screen/store/loading-screen.effects';
import { OrderEffects } from '@features/ecommerce/order/store/order.effects';
import { OrdersEffects } from '@features/ecommerce/orders/store/orders.effects';
import { PaymentMethodEffects } from '@features/ecommerce/payment-methods/store/payment-methods.effects';
import { ProductEffects } from '@features/ecommerce/product/store/product.effects';
import { SharedModule } from '@shared/shared.module';
import { environment } from 'environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        [{ provide: LOCALE_ID, useValue: 'es-ES' }, provideHttpClient(withInterceptorsFromDi())],
        importProvidersFrom(
            StoreModule.forRoot(fromApp.appReducer),
            EffectsModule.forRoot([
                GlobalEffects,
                LoadingScreenEffects,
                HomeEffects,
                CategoriesEffects,
                ProductEffects,
                OrderEffects,
                OrdersEffects,
                AddressesEffects,
                PaymentMethodEffects,
                CartEffects,
            ]),
            StoreDevtoolsModule.instrument({
                logOnly: environment.production,
                connectInZone: true,
            }),
            StoreRouterConnectingModule.forRoot(),
            SharedModule,
            BrowserAnimationsModule,
        ),
    ],
};
