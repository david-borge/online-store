import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import * as fromApp from './core/store/app.reducer';
import { GlobalEffects } from './core/store/global.effects';
import { LoadingScreenEffects } from './features/ecommerce/loading-screen/store/loading-screen.effects';
import { HomeEffects } from './features/ecommerce/home/store/home.effects';
import { CategoriesEffects } from './features/ecommerce/categories/store/categories.effects';
import { ProductEffects } from './features/ecommerce/product/store/product.effects';
import { OrderEffects } from './features/ecommerce/order/store/order.effects';
import { OrdersEffects } from './features/ecommerce/orders/store/orders.effects';
import { AddressesEffects } from './features/ecommerce/addresses/store/addresses.effects';
import { PaymentMethodEffects } from './features/ecommerce/payment-methods/store/payment-methods.effects';
import { CartEffects } from './features/ecommerce/cart/store/cart.effects';

// (Antiguo) Firestore Database
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { environment } from '../environments/environment.development';

@NgModule({
    // Declarations: incluye los Components, Directives y Custom Pipes.
    // MUY IMPORTANTE: esto es porque solo se pueden añadir los Components, Directives y Custom Pipes a declarations una vez en toda la aplicación.
    declarations: [
        AppComponent,
        // Mis componentes personalizados
        // ...
        // Mis directivas personalizadas
    ],
    // Lista de componentes que Angular debe conocer en el momento de analizar el index.html al arrancar la web. AppComponent corresponde con src\app\app.component.ts
    // Como todos los componentes nuevos van dentro de AppComponent, no hay que declararlos en bootstrap
    bootstrap: [AppComponent],
    imports: [
        // FIXME: this belongs to the old way of ssr (expressengine)
        // BrowserModule.withServerTransition({ appId: 'serverApp' }),
        StoreModule.forRoot(fromApp.appReducer), // Action Reducer Map: un objeto JS con la lista de Reducers de la app ({identificadorQueQuiera: MiReducerAsociadoAlIdentificador})
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
        ]), // Array de Side Effects
        StoreDevtoolsModule.instrument({ logOnly: environment.production, connectInZone: true }), // Instrument recibe un objeto con la configuración de Store Devtools. Con logOnly: environment.production, hacemos que solo se generen los log messages en producción.
        StoreRouterConnectingModule.forRoot(), // The Router Store
        AppRoutingModule,
        // EcommerceModule,
        SharedModule,
        // (Antiguo) Firestore Database
        // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        // provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'es-ES',
        },
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {}
