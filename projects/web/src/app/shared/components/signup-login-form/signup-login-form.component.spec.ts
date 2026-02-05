import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { SignupLoginFormComponent } from './signup-login-form.component';

describe('SignupLoginFormComponent', () => {
    let component: SignupLoginFormComponent;
    let fixture: ComponentFixture<SignupLoginFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignupLoginFormComponent],
            providers: [provideHttpClient(), provideRouter([]), provideStore(fromApp.appReducer)],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(SignupLoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
