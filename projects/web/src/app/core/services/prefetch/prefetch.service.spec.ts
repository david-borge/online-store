import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { PreFetchService } from './prefetch.service';

describe('PreFetchService', () => {
    let service: PreFetchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideStore(fromApp.appReducer)],
        });
        service = TestBed.inject(PreFetchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
