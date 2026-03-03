import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
    let service: RoutingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([])],
        });
        service = TestBed.inject(RoutingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
