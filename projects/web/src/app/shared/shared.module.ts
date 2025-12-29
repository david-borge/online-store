import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddNewAddressFormComponent } from '@shared/components/add-new-address-form/add-new-address-form/add-new-address-form.component';
import { AddNewCardFormComponent } from '@shared/components/add-new-card-form/add-new-card-form/add-new-card-form.component';
import { AddressCardComponent } from '@shared/components/address-card/address-card.component';
import { BottomOverlayComponent } from '@shared/components/bottom-overlay/bottom-overlay.component';
import { BtnWithLoadingSpinnerComponent } from '@shared/components/btn-with-loading-spinner/btn-with-loading-spinner.component';
import { CartCheckoutProductCardComponent } from '@shared/components/cart-checkout-product-card/cart-checkout-product-card.component';
import { CreditCardComponent } from '@shared/components/credit-card/credit-card.component';
import { FeaturedProductsCarrouselComponent } from '@shared/components/featured-products-carrousel/featured-products-carrousel.component';
import { InformativeCardComponent } from '@shared/components/informative-card/informative-card.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductRatingComponent } from '@shared/components/product-rating/product-rating.component';
import { ProductReviewsItemComponent } from '@shared/components/product-reviews-item/product-reviews-item.component';
import { ProductsGridComponent } from '@shared/components/products-grid/products-grid.component';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';
import { SelectButtonComponent } from '@shared/components/select-button/select-button.component';
import { SignupLoginFormComponent } from '@shared/components/signup-login-form/signup-login-form.component';
import { ImageLoadDirective } from '@shared/directives/image-load/image-load.directive';
import { PrefetchDirective } from '@shared/directives/prefetch/prefetch.directive';

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
