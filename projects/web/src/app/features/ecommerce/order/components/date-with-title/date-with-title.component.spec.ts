import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWithTitleComponent } from './date-with-title.component';

describe('DateWithTitleComponent', () => {
  let component: DateWithTitleComponent;
  let fixture: ComponentFixture<DateWithTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateWithTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateWithTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
