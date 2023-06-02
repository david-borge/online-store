import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from "@ngrx/store";

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as CartActions from '../../../cart/store/cart.actions';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';
import { ProcessStatusInterface } from 'projects/web/src/app/core/models/processStatus.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  host: {
    class:'app-product--class-for-router-outlet',
  },
})
export class ProductComponent implements OnInit, OnDestroy {
  
  // Suscripciones a la Store
  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
  productReducerObservableSubscription: Subscription = Subscription.EMPTY;
  cartReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  currentProductSlug: string = '';
  currentProduct = {} as ProductInterface;
  footerNavigationButtonRightText: string = 'Add to cart';
  addProductToCartStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';

  // Pre-load images of other pages
  imagesInThisPageLoaded: boolean = false;
  imagesOfOtherPagesToPreload: string[] = [];

  // Mostrar los elementos solo cuando estén listos (llamadas HTTP terminadas e imágenes elegidas cargadas)
  productPagePreviouslyVisited: boolean = false;
  
  // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
  currentlyInThePageIEnteredFrom: boolean = false;

  resetAddProductToCartStatusProperty: boolean = false;

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

          // Comprobación
          // console.log('currentProduct:');
          // console.log(this.currentProduct);

          // Comprobación
          // console.log('ProductComponent > currentProductSlug: ' + this.currentProduct.slug);
          // console.log('ProductComponent > currentProductName: ' + this.currentProduct.name);
          // console.log('ProductComponent > currentProductcardAndHeaderBackgroundColor: ' + this.currentProduct.cardAndHeaderBackgroundColor);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse:');
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
            this.preloadImagesService.preloadImagesOfOtherPages( this.imagesOfOtherPagesToPreload );
          }

          // console.log('productReducerResponseData get:');
          // console.log(productReducerResponseData);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse:');
          console.log(errorResponse);

        }
        
    );



    // Cart Store
    this.cartReducerObservableSubscription = this.store.select('cartReducerObservable')
    .subscribe(
      cartReducerObservable => {

        // If product is done being added to cart, change the .navigation-button-right-container button text
        this.addProductToCartStatus = cartReducerObservable.addProductToCartStatus;
        if ( this.addProductToCartStatus == 'ENDED_SUCCESSFULLY' ) {

          this.footerNavigationButtonRightText = 'Added!';

          // Al cabo de 1500 milisegundos
          setTimeout(() => {
            
            // Volver a poner el texto del botón a 'Add to cart'
            this.footerNavigationButtonRightText = 'Add to cart';

            // Resetear la propiedad por si el usuario vuelve a pulsar "Add to cart" una segunda vez (en el mismo producto o en otro)
            this.store.dispatch( CartActions.ResetAddProductToCartStatusProperty() );

          }, 1500);

        }

      }
    );

  }

  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.homeReducerObservableSubscription.unsubscribe();
    this.productReducerObservableSubscription.unsubscribe();
    this.cartReducerObservableSubscription.unsubscribe();

  }

}
