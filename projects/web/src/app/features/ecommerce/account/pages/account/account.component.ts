import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { AuthService } from 'projects/web/src/app/core/services/auth/auth.service';

import { UserInterface } from 'projects/web/src/app/core/models/user.interface';
import { ActiveOrderInterface } from 'projects/web/src/app/core/models/activeOrder.interface';
import { ProcessStatusInterface } from 'projects/web/src/app/core/models/processStatus.interface';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  host: {
    class:'app-account--class-for-router-outlet',
  },
})
export class AccountComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  loggedIn: boolean = true;
  authMode: 'SIGNUP' | 'LOGIN' = 'SIGNUP';
  sectionHeaderTitleText: string = 'Sign Up';
  imagesInThisPageLoaded: boolean = true; // TODO:
  accountPagePreviouslyVisited: boolean = false; // TODO:
  currentlyInThePageIEnteredFrom: boolean = false; // TODO:
  signUpLogInResult: string = '';
  user: UserInterface = {} as UserInterface;
  activeOrders: ActiveOrderInterface[] = [];
  ordersTotals: number[] = [];
  logOutButtonText: ('Log out' | 'Logging out...') = 'Log out';
  logOutGlobalStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';


  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    // Leer la Global Store
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => {

      // - Authentication - Carga de una página - Comprobar si estoy logueado en una página: leer Global Store > loggedIn
      this.loggedIn = globalReducerData.loggedIn;

      // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
      this.authMode = globalReducerData.authMode;

      // - Section Header Title Text (based on the authMode)
      this.sectionHeaderTitleText = ( (this.authMode == 'SIGNUP') ? 'Sign Up' : 'Log In' );

      // - signUpLogInResult
      this.signUpLogInResult = globalReducerData.signUpLogInResult;

      // - User (firstName, lastName, email)
      this.user = globalReducerData.user;

      // - activeOrders
      this.activeOrders = globalReducerData.activeOrders;

      // - logOutGlobalStatus
      this.logOutGlobalStatus = globalReducerData.logOutGlobalStatus;

      // - logOutButtonText
      if ( this.logOutGlobalStatus == 'STARTED' ) {

        // Comprobacion
        // console.log('Logging out...');

        this.logOutButtonText = 'Logging out...';

      } else {

        this.logOutButtonText = 'Log out';
        
      }

    });

  }

  onClickLogOutButton() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
