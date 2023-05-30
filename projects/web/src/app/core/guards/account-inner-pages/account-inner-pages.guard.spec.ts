import { TestBed } from '@angular/core/testing';

import { AccountInnerPagesGuard } from './account-inner-pages.guard';

describe('AccountInnerPagesGuard', () => {
  let guard: AccountInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
