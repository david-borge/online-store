import { CurrencyPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CurrencyFormatPipe } from '@core/pipes/currency-format.pipe';

import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
    let component: OrderDetailComponent;
    let fixture: ComponentFixture<OrderDetailComponent>;

    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderDetailComponent],
            imports: [CurrencyFormatPipe],
            providers: [
                CurrencyPipe,
                provideMockStore({}),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { 'order-number': 12345 },
                        },
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(OrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
