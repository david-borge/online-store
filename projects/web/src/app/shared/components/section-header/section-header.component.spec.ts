import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
    let component: SectionHeaderComponent;
    let fixture: ComponentFixture<SectionHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SectionHeaderComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(SectionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
