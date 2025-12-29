import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { take } from 'rxjs';

import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '@core/store/global.actions';

@Injectable({
    providedIn: 'root',
})
export class RoutingService {
    private router = inject(Router);
    private store = inject<Store<fromApp.AppState>>(Store);

    // Al cambiar de ruta, indicarlo en la Store Global
    SetFirstVisitedPage() {
        this.router.events.pipe(take(1)).subscribe((_val) => {
            // Comprobación
            // console.log('URL actual: ' + this.router.url);

            // Indicarlo en la Store Global (si el valor de globalReducerData.firstVisitedPage no se ha establecido antes, es decir, es '')
            this.store
                .select('globalReducerObservable')
                .pipe(take(1))
                .subscribe((globalReducerData) => {
                    if (globalReducerData.firstVisitedPage == '') {
                        this.store.dispatch(
                            GlobalActions.SetFirstVisitedPage({
                                visitedPageURLPayload: this.router.url,
                            }),
                        );
                    }
                });
        });
    }
}
