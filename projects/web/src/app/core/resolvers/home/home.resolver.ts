import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { catchError, filter, map, of, switchMap, take, timeout } from 'rxjs';

import * as fromApp from '@core/store/app.reducer';
import * as HomeActions from '@features/ecommerce/home/store/home.actions';

export const HOME_DATA_KEY = 'homeData' as const;

export const homeResolver: ResolveFn<boolean> = (_route, _state) => {
    const store = inject<Store<fromApp.AppState>>(Store);

    return store.select('homeReducerObservable').pipe(
        take(1),
        switchMap((homeState) => {
            if (homeState.allProducts.length > 0) {
                return of(true);
            }

            store.dispatch(HomeActions.GetAllProductsStart());

            return store.select('homeReducerObservable').pipe(
                filter(
                    (nextHomeState) =>
                        !nextHomeState.loadingAllProducts &&
                        (nextHomeState.allProducts.length > 0 ||
                            nextHomeState.getAllProductsErrorMessage.length > 0),
                ),
                take(1),
                map(() => true),
                timeout(4000),
                catchError(() => of(true)),
            );
        }),
    );
};
