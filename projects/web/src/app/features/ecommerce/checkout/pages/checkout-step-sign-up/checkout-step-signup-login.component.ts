import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { AuthService } from 'projects/web/src/app/core/services/auth/auth.service';

import { UserInterface } from 'projects/web/src/app/core/models/user.interface';

@Component({
  selector: 'app-checkout-step-signup-login',
  templateUrl: './checkout-step-signup-login.component.html',
  styleUrls: ['./checkout-step-signup-login.component.scss']
})
export class CheckoutStepSignupLoginComponent implements OnInit, OnDestroy {
  
  // Suscripciones a la Store
  globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  authMode: 'SIGNUP' | 'LOGIN' = 'SIGNUP';
  sectionHeaderTitleText: string = 'Sign Up';
  showBottomOverlay: boolean = false;
  signUpLogInResult: string = '';
  user: UserInterface = {} as UserInterface;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Leer la Global Store
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => {

      // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
      this.authMode = globalReducerData.authMode;

      // - Section Header Title Text (based on the authMode)
      this.sectionHeaderTitleText = ( (this.authMode == 'SIGNUP') ? 'Sign Up' : 'Log In' );

      // - signUpLogInResult
      this.signUpLogInResult = globalReducerData.signUpLogInResult;

      // - User (firstName, lastName, email)
      this.user = globalReducerData.user;

    });

  }

  onClickSignUpLogInButton() {

  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
