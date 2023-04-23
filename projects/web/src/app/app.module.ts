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
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as fromApp from './core/store/app.reducer';
import { GlobalEffects } from './core/store/global.effects';
import { HomeEffects } from './features/ecommerce/home/store/home.effects';
import { CategoriesEffects } from './features/ecommerce/categories/store/categories.effects';

import { environment } from '../environments/environment';

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

  // Imports: incluye otros módulos en este módulo.
  // Nota: aunque a nosotros no nos hará mucha falta, Angular sí subdivide sus módulos en módulos más pequeños, así que hay que importarlos aquí
  // MUCHO CUIDADO: BrowserModule: nos permite usar *ngIf, *ngFor y *ngClass y permite arrancar a la aplicación, por lo tanto SOLO debe ir en AppModule.
    // En los módulos que no sean AppModule donde quiera usar *ngIf y *ngFor, no hay que añadir BrowserModule a los imports, sino CommonModule.
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),

    StoreModule.forRoot(fromApp.appReducer),  // Action Reducer Map: un objeto JS con la lista de Reducers de la app ({identificadorQueQuiera: MiReducerAsociadoAlIdentificador})
    EffectsModule.forRoot([ GlobalEffects, HomeEffects, CategoriesEffects, ]), // Array de Side Effects
    StoreDevtoolsModule.instrument({ logOnly: environment.production }), // Instrument recibe un objeto con la configuración de Store Devtools. Con logOnly: environment.production, hacemos que solo se generen los log messages en producción.
    StoreRouterConnectingModule.forRoot(), // The Router Store
    
    AppRoutingModule,

    // EcommerceModule,
    SharedModule,
    
    HttpClientModule,

    // (Antiguo) Firestore Database
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),

    BrowserAnimationsModule,
  ],
  
  // Providers: incluye los Services (SOLO en Angular 5 o menor).
  // Alternativa a incluir un Service en providers: en el Service, poner: @Injectable({providedIn: 'root'})  // Injectable permite inyectar un servicio en un servicio. providedIn pone el servicio a disposición de toda la app (solo para Angular 6 o mayor; para Angular 5 o menor, añadir el servicio al providers de AppModule)
  // MUCHO CUIDADO: si pongo un Services en AppModule, están disponibles en todos los demás módulos (a diferencia de los Modules, Directives y Pipes, que solo están disponibles en los módulos en los que los importemos).
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
  ],

  // Lista de componentes que Angular debe conocer en el momento de analizar el index.html al arrancar la web. AppComponent corresponde con src\app\app.component.ts
  // Como todos los componentes nuevos van dentro de AppComponent, no hay que declararlos en bootstrap
  bootstrap: [AppComponent]

  // (SOLO para Angular 8 o más antiguo (ver en package.json)) Entry Components: incluye los componentes que muestro/oculto programáticamente
  // entryComponents: [ ... ],

  // Exports: permite incluir un módulo dentro de otro. Exports se pone en el módulo que quiero insertar, no en el que lo voy a insertar.
  // Incluye los componentes del módulo que quiero insertar que deben estar disponibles en el módulo donde los voy a insertar.
  // IMPORTANTE: los módulos de Angular funcionan de manera independiente, es decir, no se comunican entre sí. Por ejemplo, si importo un Component en un Module, solo puedo usar ese Component en ese Module, pero no en otros Modules.
  // IMPORTANTE: si tengo un nombreModulo-routing.module.ts con las rutas de este módulo, no hace falta exportar los componentes definidos en los imports.
  // exports: [ ... ],

})
export class AppModule { }
