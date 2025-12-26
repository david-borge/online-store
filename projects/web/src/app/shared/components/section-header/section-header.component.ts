import { Component, Input, OnChanges, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../core/store/global.actions';

@Component({
    standalone: false,
    selector: 'app-section-header',
    templateUrl: './section-header.component.html',
    styleUrls: ['./section-header.component.scss'],
    encapsulation: ViewEncapsulation.None, // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (sectionHeaderTitleInnerHTML)
})
export class SectionHeaderComponent implements OnChanges {
    router = inject(Router);
    private store = inject<Store<fromApp.AppState>>(Store);

    // Propiedades - Section Header - Title
    @Input() sectionHeaderTitleTag = '';
    @Input() sectionHeaderTitleClasses = '';
    @Input() sectionHeaderTitleText = '';
    sectionHeaderTitleInnerHTML = '';

    // Propiedades - Section Header - Right Side - Carousel Icons
    @Input() sectionHeaderCarouselIcons = false;

    // Propiedades - Section Header - Link
    @Input() sectionHeaderLink = false;
    @Input() sectionHeaderLinkURL = '';
    @Input() sectionHeaderLinkText = '';

    // Propiedades - Section Header - Button
    @Input() sectionHeaderButton = false;
    @Input() sectionHeaderButtonURL = '';
    @Input() sectionHeaderButtonText = '';

    // ngOnChanges Lifecycle hook: se ejecuta al crear una instancia del Componente, y también, cuando cambie una de las propiedades con (@output) o con @Input. Es el único Lifecycle hook que recibe un parámetro
    ngOnChanges(): void {
        // IMPORTANTE: esto tiene que estar en ngOnChanges(), no en ngOnInit() para que se detecten los cambios a sectionHeaderTitleText
        this.sectionHeaderTitleInnerHTML =
            '<' +
            this.sectionHeaderTitleTag +
            ' class="' +
            this.sectionHeaderTitleClasses +
            '">' +
            this.sectionHeaderTitleText +
            '</' +
            this.sectionHeaderTitleTag +
            '>';

        // Comprobación
        // console.log('sectionHeaderTitleText: ' + this.sectionHeaderTitleText);
    }

    onClickSectionHeaderButton() {
        // - Si estoy en '/checkout/order-review' y hago click en uno de los dos botones 'Edit', reducir el valor de currentStep en 1
        if (this.router.url.includes('/checkout/order-review')) {
            // Botón 'Edit' de Address
            if (this.sectionHeaderButtonURL === '/checkout/address') {
                this.store.dispatch(
                    GlobalActions.ChangeCurrentStepValue({
                        amount: -2, // Volver dos pasos atrás
                    }),
                );
            }

            // Botón 'Edit' de Payment Method
            else if (this.sectionHeaderButtonURL === '/checkout/payment-method') {
                this.store.dispatch(
                    GlobalActions.ChangeCurrentStepValue({
                        amount: -1,
                    }),
                );
            }
        }

        // - Navegar a la ruta
        this.router.navigate([this.sectionHeaderButtonURL]);
    }
}
