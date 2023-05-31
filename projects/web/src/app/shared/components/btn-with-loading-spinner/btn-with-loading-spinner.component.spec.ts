import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnWithLoadingSpinnerComponent } from './btn-with-loading-spinner.component';

describe('BtnWithLoadingSpinnerComponent', () => {
  let component: BtnWithLoadingSpinnerComponent;
  let fixture: ComponentFixture<BtnWithLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnWithLoadingSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnWithLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
