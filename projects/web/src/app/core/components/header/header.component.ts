import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../store/global.actions';

@Component({
    standalone: false,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    styles: [
        `
            :host {
                --step-bar-percentaje: var(
                    --default-color
                ); // Set a default value for the CSS variable
            }
        `,
    ],
})
export class HeaderComponent implements OnInit, OnDestroy {
    // Suscripciones a la Store
    globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Propiedades - Header Tag - Tipo
    @Input() headerTagType: string = 'overlay-header-main-page';

    // Propiedades - Header Tag - Título
    @Input() overlayHeaderPageTitleSupTitle: string = '';
    @Input() overlayHeaderPageTitle: string = 'Subpage Title';

    // Propiedades - Header Tag - Tipo: overlay-header-main-page

    // Propiedades - Header Tag - Tipo: overlay-header-subpage
    // @Input() overlayHeaderSubpageShowCloseIcon   :boolean = false; // No usado
    @Input() overlayHeaderSubpageBackgroundColor: string = 'inherit';
    @Input() overlayHeaderSubpageShowLeftIcon: boolean = true;

    // Propiedades - Header Tag - Tipo: overlay-header-subpage with steps
    @Input() overlayHeaderSubpageWithSteps: boolean = false;
    currentStep: number = 1;
    totalNumberOfSteps: number = 3;
    @HostBinding('style.--step-bar-percentaje') stepBarPercentaje = '0%'; // Define the CSS variable value as a component property

    // Propiedades auxiliares
    loggedIn: boolean = false;

    constructor(
        public router: Router,
        private _location: Location,
        private store: Store<fromApp.AppState>,
    ) {}

    ngOnInit() {
        // Global Store
        // Leer currentStep y totalNumberOfSteps
        this.globalReducerObservableSubscription = this.store
            .select('globalReducerObservable')
            .subscribe((globalReducerData) => {
                this.currentStep = globalReducerData.checkoutSteps.currentStep;
                this.totalNumberOfSteps = globalReducerData.checkoutSteps.totalNumberOfSteps;

                // Si el usuario no ha iniciado sesión, añadir un paso más (el sign up o log in)
                this.loggedIn = globalReducerData.loggedIn;

                // Si estoy en 'checkout/signup-login' y el usuario no ha iniciado sesión, añadir un paso más (el sign up o log in)
                if (
                    this.router.url.includes('/checkout/signup-login') &&
                    !this.loggedIn &&
                    this.totalNumberOfSteps < 4
                ) {
                    this.store.dispatch(GlobalActions.ChangeTotalNumberOfStepsValue({ amount: 1 }));
                }

                // Update the Step Bar Percentaje CSS variable value
                this.stepBarPercentaje = (this.currentStep / this.totalNumberOfSteps) * 100 + '%';
            });
    }

    // Go Back (with browser history)
    onClickGoBack(): void {
        // - Si vuelvo atrás en alguno de los pasos del Checkout que sean '/checkout/payment-method' o '/checkout/order-review', reducir el valor de currentStep en 1
        let currentURL = this.router.url;
        if (
            currentURL.includes('/checkout/payment-method') ||
            currentURL.includes('/checkout/order-review')
        ) {
            this.store.dispatch(
                GlobalActions.ChangeCurrentStepValue({
                    amount: -1,
                }),
            );
        }

        // - Go Back (with browser history)
        // Si vuelvo atrás en alguno de los pasos del Checkout, volver al paso anterior del checkout (no a la página anterior del historial, que no tiene por qué ser el paso anterior del checkout debido a la existencia de los botones 'Edit' de '/checkout/order-review')
        switch (currentURL) {
            case '/checkout/signup-login':
                this.router.navigate(['/cart']);
                break;

            case '/checkout/address':
                this.router.navigate(['/cart']);
                break;

            case '/checkout/payment-method':
                this.router.navigate(['/checkout/address']);
                break;

            case '/checkout/order-review':
                this.router.navigate(['/checkout/payment-method']);
                break;

            default:
                this._location.back(); // Go Back (with browser history)
                break;
        }
    }

    ngOnDestroy() {
        this.globalReducerObservableSubscription.unsubscribe();
    }
}
