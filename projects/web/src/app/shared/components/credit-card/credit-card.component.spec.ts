import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { CreditCardComponent } from './credit-card.component';

describe('CreditCardComponent', () => {
    let component: CreditCardComponent;
    let fixture: ComponentFixture<CreditCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditCardComponent],
            providers: [provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(CreditCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
