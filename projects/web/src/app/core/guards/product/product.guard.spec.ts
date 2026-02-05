import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { ProductGuard } from './product.guard';

describe('ProductGuard', () => {
    let guard: ProductGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideStore(fromApp.appReducer)],
        });
        guard = TestBed.inject(ProductGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
