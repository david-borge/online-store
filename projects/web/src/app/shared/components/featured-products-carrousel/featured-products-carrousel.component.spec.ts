import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductsCarrouselComponent } from './featured-products-carrousel.component';

describe('FeaturedProductsCarrouselComponent', () => {
    let component: FeaturedProductsCarrouselComponent;
    let fixture: ComponentFixture<FeaturedProductsCarrouselComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeaturedProductsCarrouselComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FeaturedProductsCarrouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
