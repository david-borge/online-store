import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ProductInterface } from '@core/models/product.interface';
import { PreFetchService } from '@core/services/prefetch/prefetch.service';

@Component({
    standalone: false,
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    encapsulation: ViewEncapsulation.None, // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-card-name *)
})
export class ProductCardComponent implements OnInit {
    private readonly preFetchService = inject(PreFetchService);
    private readonly router = inject(Router);

    // Propiedades - Product or Order Card - Product
    @Input() product = {} as ProductInterface;
    @Input() productCardTypeClass = 'product-card-featured'; // product-card-featured, product-card-small, product-card-order
    @Input() productCardProductNameTitleHeadingTag = '';
    productCardTitleHeadingTagInnerHTML = '';

    // Propiedades - Product or Order Card - Order
    @Input() orderId = 0;
    @Input() orderImageThumbnail: ProductInterface['imageThumbnail'] = '';
    @Input() orderImageWidth: ProductInterface['imageWidth'] = '';
    @Input() orderImageHeight: ProductInterface['imageHeight'] = '';
    @Input() orderTotal = 0;
    @Input() orderArrivalDate = '';
    orderArrivalDateFormated = '';
    orderIsActive = false;

    constructor() {
        /* IMPORTANTE: esto es para que funcionen los enlaces de los Featured products en la página de un producto.
       Hace que el componente se recargue al hacer click en los enlaces de los Featured products en la página de un producto.
       Si no hago esto, los datos del producto no cambian al cambiar de ruta.
    */
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };
    }

    ngOnInit(): void {
        // Product Card Name HTML
        if (this.productCardProductNameTitleHeadingTag == '')
            this.productCardProductNameTitleHeadingTag = 'h2'; // Valor por defecto en caso de que no se proporcione
        this.productCardTitleHeadingTagInnerHTML =
            '<' +
            this.productCardProductNameTitleHeadingTag +
            '>' +
            this.product.name +
            '</' +
            this.productCardProductNameTitleHeadingTag +
            '>';

        // Order arrival date: formatear fecha
        if (this.orderArrivalDate != '') {
            const nowDate = new Date();
            const orderArrivalDateDate = new Date(this.orderArrivalDate);

            // Comprobacion
            // console.log('nowDate: ' + nowDate);

            // Si llega hoy
            if (this.sameDay(nowDate, orderArrivalDateDate)) {
                this.orderArrivalDateFormated = 'today';
            }

            // Si llega mañana
            else if (this.tomorrow(nowDate, orderArrivalDateDate)) {
                this.orderArrivalDateFormated = 'tomorrow';
            }
        }

        // Order arrival date: check if it is active
        // CUIDADO: no puedo usar la columna active porque no tengo un sistema en el que ese valor cambie a 1 cuando el paquete ha sido entregado
        if (new Date(this.orderArrivalDate) > new Date()) {
            this.orderIsActive = true;
        }
    }

    sameDay(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    tomorrow(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() + 1 === date2.getDate()
        );
    }
}
