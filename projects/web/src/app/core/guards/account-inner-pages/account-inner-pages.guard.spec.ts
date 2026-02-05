import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AccountInnerPagesGuard } from './account-inner-pages.guard';

describe('AccountInnerPagesGuard', () => {
    let guard: AccountInnerPagesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(AccountInnerPagesGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
