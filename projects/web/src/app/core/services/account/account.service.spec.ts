import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AccountService } from './account.service';

describe('AccountService', () => {
    let service: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideStore(fromApp.appReducer)],
        });
        service = TestBed.inject(AccountService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
