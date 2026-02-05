import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
    let service: RoutingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        });
        service = TestBed.inject(RoutingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
