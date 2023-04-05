import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';

import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FeaturedProductsCarrouselComponent } from './components/featured-products-carrousel/featured-products-carrousel.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductReviewsItemComponent } from './components/product-reviews-item/product-reviews-item.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { CartCheckoutProductCardComponent } from './components/cart-checkout-product-card/cart-checkout-product-card.component';
import { InformativeCardComponent } from './components/informative-card/informative-card.component';



@NgModule({
  declarations: [
    SectionHeaderComponent,
    ProductCardComponent,
    FeaturedProductsCarrouselComponent,
    ProductRatingComponent,
    ProductReviewsItemComponent,
    ProductsGridComponent,
    CartCheckoutProductCardComponent,
    InformativeCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],

  // Añadir a exports todo lo que haya puesto en declarations e imports, para que esté disponible en los otros módulos que van a usar las cosas de SharedModule.
  exports: [
    SectionHeaderComponent,
    ProductCardComponent,
    FeaturedProductsCarrouselComponent,
    ProductRatingComponent,
    ProductReviewsItemComponent,
    ProductsGridComponent,
    CartCheckoutProductCardComponent,
    InformativeCardComponent,
  ],

})
export class SharedModule { }
