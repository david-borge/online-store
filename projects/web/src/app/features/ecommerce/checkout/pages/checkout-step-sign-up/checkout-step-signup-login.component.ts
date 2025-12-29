import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { AuthMode } from 'src/app/core/models/authMode.enum';
import { UserInterface } from 'src/app/core/models/user.interface';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Component({
    standalone: false,
    selector: 'app-checkout-step-signup-login',
    templateUrl: './checkout-step-signup-login.component.html',
    styleUrls: ['./checkout-step-signup-login.component.scss'],
})
export class CheckoutStepSignupLoginComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    authMode: AuthMode = AuthMode.SIGNUP;
    sectionHeaderTitleText = 'Sign Up';
    showBottomOverlay = false;
    signUpLogInResult = '';
    user: UserInterface = {} as UserInterface;

    ngOnInit(): void {
        // Leer la Global Store
        this.globalReducerObservableSubscription = this.store
            .select('globalReducerObservable')
            .subscribe((globalReducerData) => {
                // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
                this.authMode = globalReducerData.authMode;

                // - Section Header Title Text (based on the authMode)
                this.sectionHeaderTitleText = this.authMode == 'SIGNUP' ? 'Sign Up' : 'Log In';

                // - signUpLogInResult
                this.signUpLogInResult = globalReducerData.signUpLogInResult;

                // - User (firstName, lastName, email)
                this.user = globalReducerData.user;
            });
    }

    onClickSignUpLogInButton() {}

    ngOnDestroy(): void {
        this.globalReducerObservableSubscription.unsubscribe();
    }
}
