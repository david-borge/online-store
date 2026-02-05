import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { LoadingScreenComponent } from './loading-screen.component';

describe('LoadingScreenComponent', () => {
    let component: LoadingScreenComponent;
    let fixture: ComponentFixture<LoadingScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingScreenComponent],
            providers: [
                provideRouter([]),
                provideStore(fromApp.appReducer),
                provideAnimationsAsync(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoadingScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
