import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { CategoryCardComponent } from './category-card.component';

describe('CategoryCardComponent', () => {
    let component: CategoryCardComponent;
    let fixture: ComponentFixture<CategoryCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryCardComponent],
            imports: [RouterModule.forRoot([])],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
