import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  host: {
    class:'app-product-class-for-router-outlet',
  },
})
export class ProductComponent implements OnInit, OnDestroy {
  
  // Suscripciones a la Store
  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
  productReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  currentProductSlug: string = '';
  currentProduct = {} as ProductInterface;

  // Pre-load images of other pages
  imagesInThisPageLoaded: boolean = false;
  imagesOfOtherPagesToPreload: string[] = [];

  // Mostrar los elementos solo cuando estén listos (llamadas HTTP terminadas e imágenes elegidas cargadas)
  productPagePreviouslyVisited: boolean = false;
  
  // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
  currentlyInThePageIEnteredFrom: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private preloadImagesService: PreloadImagesService,
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

          )[0];  // Primer y único elemento del array, que es el producto actual

          // Comprobacion
          // console.log('currentProduct:');
          // console.log(this.currentProduct);

          // Comprobacion
          // console.log('ProductComponent > currentProductSlug: ' + this.currentProduct.slug);
          // console.log('ProductComponent > currentProductName: ' + this.currentProduct.name);
          // console.log('ProductComponent > currentProductcardAndHeaderBackgroundColor: ' + this.currentProduct.cardAndHeaderBackgroundColor);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse get:');
          console.log(errorResponse);

        }
        
      );


    
    // Product Store
    this.productReducerObservableSubscription = this.store.select('productReducerObservable').subscribe(
      
        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (productReducerResponseData)  => {

          // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de otras páginas
          if ( (productReducerResponseData.numberOfImagesInThisPage == productReducerResponseData.numberOfImagesInThisPageLoaded) && (productReducerResponseData.numberOfImagesInThisPage != 0) && (productReducerResponseData.numberOfImagesInThisPageLoaded != 0) ) {
            this.imagesInThisPageLoaded = true;
            this.preloadImagesService.preloadImagesOfOtherPages( productReducerResponseData.numberOfImagesInThisPage, productReducerResponseData.numberOfImagesInThisPageLoaded, this.imagesOfOtherPagesToPreload );
          }

          // console.log('productReducerResponseData get:');
          // console.log(productReducerResponseData);

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

    // Cancelar suscripciones
    this.homeReducerObservableSubscription.unsubscribe();
    this.productReducerObservableSubscription.unsubscribe();

  }

}
