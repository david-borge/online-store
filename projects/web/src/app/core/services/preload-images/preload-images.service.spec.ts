import { TestBed } from '@angular/core/testing';

import { PreloadImagesService } from './preload-images.service';

describe('PreloadImagesService', () => {
    let service: PreloadImagesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PreloadImagesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
