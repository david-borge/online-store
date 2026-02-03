import { Component, Input, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { CartInterface } from '@core/models/cart.interface';
import { ProductInterface } from '@core/models/product.interface';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CartActions from '@features/ecommerce/cart/store/cart.actions';

@Component({
    standalone: false,
    selector: 'app-cart-checkout-product-card',
    templateUrl: './cart-checkout-product-card.component.html',
    styleUrls: ['./cart-checkout-product-card.component.scss'],
})
export class CartCheckoutProductCardComponent {
    private readonly store = inject<Store<fromApp.AppState>>(Store);

    // Propiedades - Cart and Checkout Product Card - Product
    @Input() cartDataArrayId = 0;
    @Input() productId: ProductInterface['id'] = 0;
    @Input() productImageThumbnail: ProductInterface['imageThumbnail'] = '';
    @Input() productName: ProductInterface['name'] = '';
    @Input() productPrice: ProductInterface['price'] = 0;
    @Input() productQuantity: CartInterface['productQuantity'] = 0;
    @Input() productImageWidth: ProductInterface['imageWidth'] = '';
    @Input() productImageHeight: ProductInterface['imageHeight'] = '';

    // Propiedades - Cart and Checkout Product Card - Navigation CTAs & Copy
    @Input() cartCheckoutProductCardShowButtons = true;

    onClickMinusOrDeleteButton() {
        this.productQuantity--;

        // Decrease Product Quantity
        if (this.productQuantity > 0) {
            // Actualizar cantidad del producto en la Cart Store y en la Base de Datos
            this.updateProductQuantity();
        }

        // Delete Product From Cart
        else {
            // Delete Product From Cart en la Cart Store y en la Base de Datos
            this.store.dispatch(
                CartActions.DeleteProductFromCartStart({
                    cartDataArrayIdPayload: this.cartDataArrayId,
                    productIdPayload: this.productId,
                }),
            );
        }
    }

    onClickPlusButton() {
        this.productQuantity++;

        // Actualizar cantidad del producto en la Cart Store y en la Base de Datos
        this.updateProductQuantity();
    }

    // Actualizar cantidad del producto en la Cart Store y en la Base de Datos
    updateProductQuantity() {
        // Comprobacion
        // console.log('Update Product Quantity: productId = ' + this.productId + ', productQuantity = ' + this.productQuantity + ', cartDataArrayId = ' + this.cartDataArrayId);

        // Actualizar cantidad del producto en la Cart Store y en la Base de Datos
        this.store.dispatch(
            CartActions.UpdateProductQuantityStart({
                cartDataArrayIdPayload: this.cartDataArrayId,
                productQuantityPayload: this.productQuantity,
                productIdPayload: this.productId,
            }),
        );
    }
}
