import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as GlobalActions from '../../../core/store/global.actions';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { }

  // Al cambiar de ruta, indicarlo en la Store Global
  setHaveNavigatedToTrue() {
    
    this.router.events.pipe(take(1)).subscribe((val) => {

      // Comprobacion
      // console.log('URL actual: ' + this.router.url);

      // Indicarlo en la Store Global (si el valor de globalReducerData.firstVisitedPage no se ha establecido antes, es decir, es '')
      this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {

        if ( globalReducerData.firstVisitedPage == '' ) {

          this.store.dispatch( GlobalActions.SetFirstVisitedPage({ visitedPageURLPayload: this.router.url, }) );

        }

      });

    });

  }

}
