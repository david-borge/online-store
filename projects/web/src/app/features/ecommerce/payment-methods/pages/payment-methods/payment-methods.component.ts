import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { GetPaymentMethodsPHPInterface } from 'src/app/core/models/getPaymentMethodsPHP.interface';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as PaymentMethodsActions from '../../store/payment-methods.actions';

@Component({
    standalone: false,
    selector: 'app-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.scss'],
    host: {
        class: 'app-payment-methods--class-for-router-outlet',
    },
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Template variables
    paymentMethods: GetPaymentMethodsPHPInterface['paymentMethods'] = [];
    showBottomOverlay = false;

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
            });
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.paymentMethodsReducerObservableSubscription.unsubscribe();
    }
}
