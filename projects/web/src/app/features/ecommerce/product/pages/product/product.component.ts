import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  
  currentProductSlug: string = '';
  currentProduct = {} as ProductInterface;

  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Leer datos desde la Store y mostrarlos
    // Slug del producto actual
    this.homeReducerObservableSubscription = this.store.select('homeReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (homeReducerResponseData)  => {

          // console.log('homeReducerResponseData get:');
          // console.log(homeReducerResponseData);

          // Cojo el valor del slug del producto actual y lo guardo en la variable de este componente para poder mostrar el título y el color de fondo apropiados en el header
          this.currentProductSlug = homeReducerResponseData.currentProductSlug;

          // Filtro los productos - Producto con el slug actual
          this.currentProduct = homeReducerResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.slug == this.currentProductSlug);

            }

          )[0]  // Primer y único elemento del array, que es el producto actual

          // Comprobacion
          // console.log('currentProduct:');
          // console.log(this.currentProduct);

          // Comprobacion
          // console.log('ProductComponent > currentProductSlug: ' + this.currentProductSlug);
          // console.log('ProductComponent > currentProductName: ' + this.currentProductName);
          // console.log('ProductComponent > currentProductcardAndHeaderBackgroundColor: ' + this.currentProductcardAndHeaderBackgroundColor);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse get:');
          console.log(errorResponse);

        }
        
      );

  }

  ngOnDestroy(): void {
    this.homeReducerObservableSubscription.unsubscribe();
  }

}
