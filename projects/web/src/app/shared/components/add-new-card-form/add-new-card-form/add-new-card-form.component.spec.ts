import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AddNewCardFormComponent } from './add-new-card-form.component';

describe('AddNewCardFormComponent', () => {
    let component: AddNewCardFormComponent;
    let fixture: ComponentFixture<AddNewCardFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNewCardFormComponent],
            providers: [provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(AddNewCardFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
