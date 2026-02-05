import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
    let component: CategoriesComponent;
    let fixture: ComponentFixture<CategoriesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoriesComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
