import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
