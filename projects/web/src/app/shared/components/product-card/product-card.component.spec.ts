import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductCardComponent],
            providers: [provideRouter([]), provideStore(fromApp.appReducer)],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
