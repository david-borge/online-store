import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddNewAddressFormComponent } from './components/add-new-address-form/add-new-address-form/add-new-address-form.component';
import { AddNewCardFormComponent } from './components/add-new-card-form/add-new-card-form/add-new-card-form.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { BottomOverlayComponent } from './components/bottom-overlay/bottom-overlay.component';
import { BtnWithLoadingSpinnerComponent } from './components/btn-with-loading-spinner/btn-with-loading-spinner.component';
import { CartCheckoutProductCardComponent } from './components/cart-checkout-product-card/cart-checkout-product-card.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { FeaturedProductsCarrouselComponent } from './components/featured-products-carrousel/featured-products-carrousel.component';
import { InformativeCardComponent } from './components/informative-card/informative-card.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductReviewsItemComponent } from './components/product-reviews-item/product-reviews-item.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { SignupLoginFormComponent } from './components/signup-login-form/signup-login-form.component';
import { ImageLoadDirective } from './directives/image-load/image-load.directive';
import { PrefetchDirective } from './directives/prefetch/prefetch.directive';

@NgModule({
    declarations: [
        AddNewAddressFormComponent,
        AddNewCardFormComponent,
        AddressCardComponent,
        BottomOverlayComponent,
        BtnWithLoadingSpinnerComponent,
        CartCheckoutProductCardComponent,
        CreditCardComponent,
        FeaturedProductsCarrouselComponent,
        ImageLoadDirective,
        InformativeCardComponent,
        PrefetchDirective,
        ProductCardComponent,
        ProductRatingComponent,
        ProductReviewsItemComponent,
        ProductsGridComponent,
        SectionHeaderComponent,
        SelectButtonComponent,
        SignupLoginFormComponent,
    ],
    imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, RouterModule],

    // Añadir a exports todo lo que haya puesto en declarations e imports, para que esté disponible en los otros módulos que van a usar las cosas de SharedModule.
    exports: [
        AddressCardComponent,
        BottomOverlayComponent,
        BtnWithLoadingSpinnerComponent,
        CartCheckoutProductCardComponent,
        CreditCardComponent,
        FeaturedProductsCarrouselComponent,
        ImageLoadDirective,
        InformativeCardComponent,
        NgOptimizedImage,
        PrefetchDirective,
        ProductCardComponent,
        ProductRatingComponent,
        ProductReviewsItemComponent,
        ProductsGridComponent,
        SectionHeaderComponent,
        SelectButtonComponent,
        SignupLoginFormComponent,
    ],
})
export class SharedModule {}
