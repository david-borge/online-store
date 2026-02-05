import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AddNewAddressFormComponent } from './add-new-address-form.component';

describe('AddNewAddressFormComponent', () => {
    let component: AddNewAddressFormComponent;
    let fixture: ComponentFixture<AddNewAddressFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddNewAddressFormComponent],
            providers: [provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(AddNewAddressFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
