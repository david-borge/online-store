import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { BottomOverlayComponent } from './bottom-overlay.component';

describe('BottomOverlayComponent', () => {
    let component: BottomOverlayComponent;
    let fixture: ComponentFixture<BottomOverlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BottomOverlayComponent],
            providers: [provideStore(fromApp.appReducer)],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(BottomOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
