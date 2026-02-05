import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AddressesComponent } from './addresses.component';

describe('AddressesComponent', () => {
    let component: AddressesComponent;
    let fixture: ComponentFixture<AddressesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddressesComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(AddressesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
