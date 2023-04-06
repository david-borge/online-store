import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomOverlayComponent } from './bottom-overlay.component';

describe('BottomOverlayComponent', () => {
  let component: BottomOverlayComponent;
  let fixture: ComponentFixture<BottomOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
