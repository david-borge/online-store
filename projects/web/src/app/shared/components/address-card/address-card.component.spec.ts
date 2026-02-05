import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { AddressCardComponent } from './address-card.component';

describe('AddressCardComponent', () => {
    let component: AddressCardComponent;
    let fixture: ComponentFixture<AddressCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddressCardComponent],
            providers: [provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(AddressCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
