import { TestBed } from '@angular/core/testing';

import { PreFetchService } from './prefetch.service';

describe('PreFetchService', () => {
  let service: PreFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
