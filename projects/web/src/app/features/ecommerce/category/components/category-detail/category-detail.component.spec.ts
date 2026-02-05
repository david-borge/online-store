import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CategoryDetailComponent } from './category-detail.component';

describe('CategoryDetailComponent', () => {
    let component: CategoryDetailComponent;
    let fixture: ComponentFixture<CategoryDetailComponent>;

    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryDetailComponent],
            providers: [
                provideMockStore({}),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { 'category-slug': 'reading' },
                        },
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        store = TestBed.inject(MockStore);
        fixture = TestBed.createComponent(CategoryDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
