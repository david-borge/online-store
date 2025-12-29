import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

registerLocaleData(localeEs);

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private authService = inject(AuthService);
    private store = inject<Store<fromApp.AppState>>(Store);

    title = 'web';

    // Suscripciones a la Store
    globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    showBottomOverlay = false;

    ngOnInit(): void {
        // - Authentication - Comprobar si el usuario está logueado (leer las cookies "authToken" y "authExpirationDate", guardar sus valores en la Global Store y ajustar el valor de loggedIn de la Global Store acordemente)
        this.authService.checkIfUserIsLoggedIn();

        // - Leer datos de la Global Store
        this.globalReducerObservableSubscription = this.store
            .select('globalReducerObservable')
            .subscribe((globalReducerData) => {
                // Recuperar el showBottomOverlay desde la Global Store
                this.showBottomOverlay = globalReducerData.showBottomOverlay;
            });
    }

    ngOnDestroy() {
        this.globalReducerObservableSubscription.unsubscribe();
    }
}
