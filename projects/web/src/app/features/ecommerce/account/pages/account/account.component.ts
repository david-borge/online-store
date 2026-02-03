import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { ActiveOrderInterface } from '@core/models/activeOrder.interface';
import { AuthMode } from '@core/models/authMode.enum';
import { ProcessStatus } from '@core/models/processStatus.enum';
import { UserInterface } from '@core/models/user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Component({
    standalone: false,
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    host: {
        class: 'app-account--class-for-router-outlet',
    },
})
export class AccountComponent implements OnInit, OnDestroy {
    private readonly store = inject<Store<fromApp.AppState>>(Store);
    private readonly authService = inject(AuthService);
    private readonly titleService = inject(Title);

    // Suscripciones a la Store
    globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    loggedIn = true;
    authMode: AuthMode = AuthMode.SIGNUP;
    sectionHeaderTitleText = 'Sign Up';
    imagesInThisPageLoaded = true; // TODO:
    accountPagePreviouslyVisited = false; // TODO:
    currentlyInThePageIEnteredFrom = false; // TODO:
    signUpLogInResult = '';
    user: UserInterface = {} as UserInterface;
    activeOrders: ActiveOrderInterface[] = [];
    ordersTotals: number[] = [];
    logOutButtonText: 'Log out' | 'Logging out...' = 'Log out';
    logOutGlobalStatus: ProcessStatus = ProcessStatus.NOT_STARTED;

    ngOnInit(): void {
        // Leer la Global Store
        this.globalReducerObservableSubscription = this.store
            .select('globalReducerObservable')
            .subscribe((globalReducerData) => {
                // - Authentication - Carga de una página - Comprobar si estoy logueado en una página: leer Global Store > loggedIn
                this.loggedIn = globalReducerData.loggedIn;

                // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
                this.authMode = globalReducerData.authMode;

                // - Section Header Title Text (based on the authMode)
                this.sectionHeaderTitleText = this.authMode == 'SIGNUP' ? 'Sign Up' : 'Log In';

                // - signUpLogInResult
                this.signUpLogInResult = globalReducerData.signUpLogInResult;

                // - User (firstName, lastName, email)
                this.user = globalReducerData.user;

                // - activeOrders
                this.activeOrders = globalReducerData.activeOrders;

                // - logOutGlobalStatus
                this.logOutGlobalStatus = globalReducerData.logOutGlobalStatus;

                // - logOutButtonText
                if (this.logOutGlobalStatus === ProcessStatus.STARTED) {
                    // Comprobacion
                    // console.log('Logging out...');

                    this.logOutButtonText = 'Logging out...';
                } else {
                    this.logOutButtonText = 'Log out';
                }
            });

        // Cambiar el título de la página
        this.titleService.setTitle('Account - Online Store');
    }

    onClickLogOutButton() {
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        this.globalReducerObservableSubscription.unsubscribe();
    }
}
