import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetCartDataPHPInterface } from '@core/models/GetCartDataPHP.interface';
import { GetOrderDataPHPInterface } from '@core/models/getOrderDataPHP.interface';
import { ProcessStatus } from '@core/models/processStatus.enum';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '@features/ecommerce/addresses/store/addresses.actions';
import * as CartActions from '@features/ecommerce/cart/store/cart.actions';
import * as OrderActions from '@features/ecommerce/order/store/order.actions';
import * as PaymentMethodsActions from '@features/ecommerce/payment-methods/store/payment-methods.actions';

@Component({
    standalone: false,
    selector: 'app-checkout-step-order-review',
    templateUrl: './checkout-step-order-review.component.html',
    styleUrls: ['./checkout-step-order-review.component.scss'],
})
export class CheckoutStepOrderReviewComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    orderReducerObservableSubscription: Subscription = Subscription.EMPTY;
    cartReducerObservableSubscription: Subscription = Subscription.EMPTY;
    addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;
    paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    currentOrderNumber = 0;
    orderNumber = 0;
    orderData: GetOrderDataPHPInterface['orderData'] = {} as GetOrderDataPHPInterface['orderData'];
    orderProducts: GetCartDataPHPInterface['cartData'] = [];
    orderAddress: GetOrderDataPHPInterface['orderAddress'] =
        {} as GetOrderDataPHPInterface['orderAddress'];
    orderPaymentMethod: GetOrderDataPHPInterface['orderPaymentMethod'] =
        {} as GetOrderDataPHPInterface['orderPaymentMethod'];
    orderTotal = 0;
    payNowButtonText = 'Pay now';
    saveOrderStatus: ProcessStatus = ProcessStatus.NOT_STARTED;

    ngOnInit(): void {
        // Leer currentOrderNumber de la Order Store
        this.orderReducerObservableSubscription = this.store
            .select('orderReducerObservable')
            .subscribe((orderReducerData) => {
                this.currentOrderNumber = orderReducerData.currentOrderNumber;
                this.orderData = orderReducerData.orderData;
                this.saveOrderStatus = orderReducerData.saveOrderStatus;

                if (this.saveOrderStatus === ProcessStatus.STARTED) {
                    this.payNowButtonText = 'Paying...';
                }
            });

        // Leer orderProducts de la Cart Store y calcular orderTotal (a partir del precio y la cantidad de los productos, datos que están en orderProducts)
        this.cartReducerObservableSubscription = this.store
            .select('cartReducerObservable')
            .subscribe((cartReducerData) => {
                // Leer orderProducts de la Cart Store
                this.orderProducts = cartReducerData.cartData;

                // Comprobacion
                // console.log('orderProducts:');
                // console.log(this.orderProducts);

                // Calcular orderTotal (a partir del precio y la cantidad de los productos, datos que están en orderProducts)
                this.orderProducts.map((orderProduct) => {
                    this.orderTotal += orderProduct.price * orderProduct.productQuantity;
                });
            });

        // Leer orderAddress de la Addresses Store
        this.addressesReducerObservableSubscription = this.store
            .select('addressesReducerObservable')
            .subscribe((addressesReducerData) => {
                // orderAddress será la address donde isDefault sea 1
                for (const address of addressesReducerData.addresses) {
                    if (address.isDefault === 1) {
                        this.orderAddress = address;
                        break;
                    }
                }
            });

        // Leer orderPaymentMethod de la Payment Methods Store
        this.paymentMethodsReducerObservableSubscription = this.store
            .select('paymentMethodsReducerObservable')
            .subscribe((paymentMethodsReducerData) => {
                // orderPaymentMethod será la payment method donde isDefault sea 1
                for (const paymentMethod of paymentMethodsReducerData.paymentMethods) {
                    if (paymentMethod.isDefault === 1) {
                        this.orderPaymentMethod = paymentMethod;
                        break;
                    }
                }
            });

        // Cargar cartData desde la Base de Datos si no están en la Cart Store (ocurre si el usuario recarga la página desde esta página)
        if (this.orderProducts.length === 0) {
            this.store.dispatch(CartActions.GetCartDataStart());
        }

        // Cargar la address desde la Base de Datos si no están en la Address Store (ocurre si el usuario recarga la página desde esta página)
        if (Object.keys(this.orderAddress).length === 0) {
            // Comprobar si el objeto está vacío
            this.store.dispatch(AddressesActions.GetAddressesStart());
        }

        // Cargar el payment method desde la Base de Datos si no están en la Payment Methods Store (ocurre si el usuario recarga la página desde esta página)
        if (Object.keys(this.orderPaymentMethod).length === 0) {
            // Comprobar si el objeto está vacío
            this.store.dispatch(PaymentMethodsActions.GetPaymentMethodsStart());
        }
    }

    onClickPayNowButton() {
        // Guardar la Order en la Base de Datos
        this.store.dispatch(
            OrderActions.SaveOrderStart({
                orderFullDatePayload: new Date().toString(), // orderFullDate es Ahora
                deliveryFullDatePayload: this.generateDeliveryFullDate(new Date()).toString(), // deliveryFullDate es Ahora + 1 día + 3 horas + 23 minutos
                addressIdPayload: this.orderAddress.id,
                paymentMethodIdPayload: this.orderPaymentMethod.id,
                orderProductsDataPayload: this.orderProducts.map((orderProduct) => {
                    return {
                        productId: orderProduct.productId,
                        productQuantity: orderProduct.productQuantity,
                    };
                }),
            }),
        );
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.orderReducerObservableSubscription.unsubscribe();
        this.cartReducerObservableSubscription.unsubscribe();
        this.addressesReducerObservableSubscription.unsubscribe();
        this.paymentMethodsReducerObservableSubscription.unsubscribe();
    }

    // deliveryFullDate es Ahora + 1 día + 3 horas + 23 minutos
    // OpenAI Generated Code
    generateDeliveryFullDate(date: Date): Date {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const threeHoursInMilliseconds = 3 * 60 * 60 * 1000; // Number of milliseconds in three hours
        const twentyThreeMinutesInMilliseconds = 23 * 60 * 1000; // Number of milliseconds in 23 minutes

        // Convert the input date to milliseconds
        const dateInMilliseconds = date.getTime();

        // Calculate the new date by adding the duration
        const newDateInMilliseconds =
            dateInMilliseconds +
            oneDayInMilliseconds +
            threeHoursInMilliseconds +
            twentyThreeMinutesInMilliseconds;

        // Create a new Date object from the new date in milliseconds and return it
        return new Date(newDateInMilliseconds);
    }
}
