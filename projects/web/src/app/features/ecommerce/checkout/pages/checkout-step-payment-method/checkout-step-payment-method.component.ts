import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetPaymentMethodsPHPInterface } from 'projects/web/src/app/core/models/getPaymentMethodsPHP.interface';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../../../core/store/global.actions';
import * as PaymentMethodsActions from '../../../payment-methods/store/payment-methods.actions';


@Component({
    standalone: false,
    selector: 'app-checkout-step-payment-method',
    templateUrl: './checkout-step-payment-method.component.html',
    styleUrls: ['./checkout-step-payment-method.component.scss'],
    host: {
        class: 'app-checkout-step-payment-method--class-for-router-outlet',
    },
})
export class CheckoutStepPaymentMethodComponent implements OnInit, OnDestroy {
    // Suscripciones a la Store
    paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    paymentMethods: GetPaymentMethodsPHPInterface['paymentMethods'] = [];
    showBottomOverlay = false;
    reviewYourOrderButtonIsEnabled = false;

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {}

    ngOnInit(): void {
        // Leer datos de la Global Store
        let userEmail = '';
        this.store.select('globalReducerObservable').subscribe((globalReducerData) => {
            // Recuperar el email del usuario desde la Global Store
            userEmail = globalReducerData.user.email;

            // Leer las propiedades de BottomOverlay de la Global Store
            this.showBottomOverlay = globalReducerData.showBottomOverlay;
        });

        // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
        this.store.dispatch(PaymentMethodsActions.GetPaymentMethodsStart());

        // Leer los datos de la Order de la Store para mostrarlos en la Template
        this.paymentMethodsReducerObservableSubscription = this.store
            .select('paymentMethodsReducerObservable')
            .subscribe((paymentMethodsReducerData) => {
                this.paymentMethods = paymentMethodsReducerData.paymentMethods;

                // Comprobacion
                // console.log('paymentMethods:');
                // console.log(this.paymentMethods);

                // Establecer si el usuario puede pasar al siguiente paso: si ha seleccionado un método de pago
                this.reviewYourOrderButtonIsEnabled = false;
                for (let i = 0; i < this.paymentMethods.length; i++) {
                    if (this.paymentMethods[i].isDefault == 1) {
                        this.reviewYourOrderButtonIsEnabled = true;
                        break;
                    }
                }
            });
    }

    onClickAddNewCardButton() {
        // Mostrar el "Add new address" overlay
        this.store.dispatch(
            GlobalActions.ShowOrHideBottomOverlay({
                showBottomOverlayValue: true,
            }),
        );
    }

    onClickPaymentButton() {
        this.store.dispatch(
            GlobalActions.ChangeCurrentStepValue({
                amount: 1,
            }),
        );

        this.router.navigate(['/checkout/order-review']);
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.paymentMethodsReducerObservableSubscription.unsubscribe();
    }
}
