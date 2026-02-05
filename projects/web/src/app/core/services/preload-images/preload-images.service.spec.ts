import { TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { PreloadImagesService } from './preload-images.service';

describe('PreloadImagesService', () => {
    let service: PreloadImagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideStore(fromApp.appReducer)],
        });
        service = TestBed.inject(PreloadImagesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
