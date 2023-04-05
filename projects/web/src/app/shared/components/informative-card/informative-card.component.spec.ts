import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeCardComponent } from './informative-card.component';

describe('InformativeCardComponent', () => {
  let component: InformativeCardComponent;
  let fixture: ComponentFixture<InformativeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformativeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
