import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import { ProductInterface } from '../../../core/models/product.interface';

import { PreFetchService } from '../../../core/services/prefetch/prefetch.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-card-name *)
})
export class ProductCardComponent implements OnInit {

  // Propiedades - Product or Order Card - Product
  @Input() product = {} as ProductInterface;
  @Input() productCardTypeClass: string = 'product-card-featured'; // product-card-featured, product-card-small, product-card-order
  @Input() productCardProductNameTitleHeadingTag: string = '';
  productCardTitleHeadingTagInnerHTML: string = '';
  
  // Propiedades - Product or Order Card - Order
  @Input() orderId             : number = 0;
  @Input() orderImageThumbnail : ProductInterface['imageThumbnail'] = '';
  @Input() orderImageWidth     : ProductInterface['imageWidth'] = '';
  @Input() orderImageHeight    : ProductInterface['imageHeight'] = '';
  @Input() orderTotal          : number = 0;
  @Input() orderArrivalDate    : string = '';
  orderArrivalDateFormated     : string = '';


  constructor(
    private preFetchService: PreFetchService,
    private router: Router,
  ) {

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
    if( this.productCardProductNameTitleHeadingTag == '' )
      this.productCardProductNameTitleHeadingTag = 'h2'; // Valor por defecto en caso de que no se proporcione
    this.productCardTitleHeadingTagInnerHTML = '<' + this.productCardProductNameTitleHeadingTag + '>' + this.product.name + '</' + this.productCardProductNameTitleHeadingTag + '>';

    // Order arrival date: formatear fecha
    if (this.orderArrivalDate != '') {

      let nowDate = new Date();
      let orderArrivalDateDate = new Date(this.orderArrivalDate);

      // Comprobacion
      // console.log('nowDate: ' + nowDate);

      // Si llega hoy
      if ( this.sameDay(nowDate, orderArrivalDateDate) ) {
        this.orderArrivalDateFormated = 'today';
      }

      // Si llega mañana
      else if ( this.tomorrow(nowDate, orderArrivalDateDate) ) {
        this.orderArrivalDateFormated = 'tomorrow';
      }

    }

  }

  sameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  tomorrow(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      ( date1.getDate() + 1 ) === date2.getDate();
  }

  
}
