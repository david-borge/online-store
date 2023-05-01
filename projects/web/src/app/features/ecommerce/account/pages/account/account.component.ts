import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx


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
  numberOfOrders :number = 2; // TODO:


  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Authentication - Carga de una página - Comprobar si estoy logueado en una página: leer Global Store > loggedIn
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => { this.loggedIn = globalReducerData.loggedIn });

  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
