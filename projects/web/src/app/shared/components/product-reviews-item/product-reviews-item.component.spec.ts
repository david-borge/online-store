import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsItemComponent } from './product-reviews-item.component';

describe('ProductReviewsItemComponent', () => {
  let component: ProductReviewsItemComponent;
  let fixture: ComponentFixture<ProductReviewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductReviewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
