import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';
import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  featuredProducts : ProductInterface[] = [];
  dealProducts     : ProductInterface[] = [];

  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
  categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Pre-load images of other pages
  imagesOfOtherPagesToPreload: string[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private preloadImagesService: PreloadImagesService,
  ) {}


  ngOnInit(): void {

    // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts
    


    // - All Products - Separar en Fearured y Deal Products
    // Leer datos desde la Store y mostrarlos
    this.homeReducerObservableSubscription = this.store.select('homeReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (allProductsResponseData)  => {

          // console.log('allProductsResponseData:');
          // console.log(allProductsResponseData);



          // - Filtro los productos - Featured Products
          this.featuredProducts = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.featured == 1);

            }

          );
          
          // - Filtro los productos - Deal Products
          this.dealProducts = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.deal == 1);

            }

          );

          // Comprobacion
          // console.log('featuredProducts:');
          // console.log(this.featuredProducts);

          // console.log('dealProducts:');
          // console.log(this.dealProducts);



          // - Si se han cargado todas las imágenes de esta página, comenzar a cargar las imágenes de otras páginas
          this.preloadImagesService.preloadImagesOfOtherPages( allProductsResponseData.numberOfImagesInThisPage, allProductsResponseData.numberOfImagesInThisPageLoaded, this.imagesOfOtherPagesToPreload );

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse:');
          console.log(errorResponse);

        }
        
      );



    /* - Sacar la lista de imágenes de otras páginas to pre-load:
          · Miniaturas de las categorías
    */
    this.categoriesReducerObservableSubscription = this.store.select('categoriesReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (categoriesResponseData)  => {

          // console.log('categoriesResponseData:');
          // console.log(categoriesResponseData);

          // · Miniaturas de las categorías
          if ( categoriesResponseData.allCategories.length != 0 ) {

            // Comprobacion
            // console.log('· Miniaturas de las categorías');

            this.imagesOfOtherPagesToPreload = categoriesResponseData.allCategories.map(category => category.imageThumbnail+'.webp'); // Con map extraigo un array con los valores de todos los imageThumbnail

          }
            
        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse:');
          console.log(errorResponse);

        }
        
      );

  }

  ngOnDestroy() {
    this.homeReducerObservableSubscription.unsubscribe();
    this.categoriesReducerObservableSubscription.unsubscribe();
  }

}
