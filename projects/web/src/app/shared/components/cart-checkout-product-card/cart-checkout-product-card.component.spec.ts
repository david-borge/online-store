import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutProductCardComponent } from './cart-checkout-product-card.component';

describe('CartCheckoutProductCardComponent', () => {
  let component: CartCheckoutProductCardComponent;
  let fixture: ComponentFixture<CartCheckoutProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckoutProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCheckoutProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
