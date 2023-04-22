import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FeaturedProductsCarrouselComponent } from './components/featured-products-carrousel/featured-products-carrousel.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductReviewsItemComponent } from './components/product-reviews-item/product-reviews-item.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { CartCheckoutProductCardComponent } from './components/cart-checkout-product-card/cart-checkout-product-card.component';
import { InformativeCardComponent } from './components/informative-card/informative-card.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { BottomOverlayComponent } from './components/bottom-overlay/bottom-overlay.component';

import { PrefetchDirective } from './directives/prefetch/prefetch.directive';
import { ImageLoadedDirective } from './directives/image-loaded/image-loaded.directive';




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
    CreditCardComponent,
    AddressCardComponent,
    SelectButtonComponent,
    BottomOverlayComponent,

    // Mis directivas personalizadas
    PrefetchDirective,
    ImageLoadedDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,

    NgOptimizedImage,
  ],

  // Añadir a exports todo lo que haya puesto en declarations e imports, para que esté disponible en los otros módulos que van a usar las cosas de SharedModule.
  exports: [
    NgOptimizedImage,
    SectionHeaderComponent,
    ProductCardComponent,
    FeaturedProductsCarrouselComponent,
    ProductRatingComponent,
    ProductReviewsItemComponent,
    ProductsGridComponent,
    CartCheckoutProductCardComponent,
    InformativeCardComponent,
    CreditCardComponent,
    AddressCardComponent,
    SelectButtonComponent,
    BottomOverlayComponent,
    PrefetchDirective,
    ImageLoadedDirective,
  ],

})
export class SharedModule { }
