import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  featuredProducts : ProductInterface[] = [];
  dealProducts     : ProductInterface[] = [];

  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Pre-load images of other pages
  imagesOfOtherPagesToPreload = [ "assets/img/categories/reading.webp", "assets/img/categories/tech.webp" ];
  numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded = 0;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}


  ngOnInit(): void {

    // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\pre-fetch\prefetch.service.ts
    
    // Leer datos desde la Store y mostrarlos
    // All Products - Separar en Fearured y Deal Products
    this.homeReducerObservableSubscription = this.store.select('homeReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (allProductsResponseData)  => {

          // console.log('allProductsResponseData get:');
          // console.log(allProductsResponseData);

          // Filtro los productos - Featured Products
          this.featuredProducts = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.featured == 1);

            }

          );
          
          // Filtro los productos - Deal Products
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

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse get:');
          console.log(errorResponse);

        }
        
      );

  }

  ngOnDestroy() {
    this.homeReducerObservableSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    // Load images
    this.preloadImagesOfOtherPages();

  }

  preloadImagesOfOtherPages(){
    for(let i = 0; i < this.imagesOfOtherPagesToPreload.length; i++){
      let img = new Image();
      img.onload = () => {
        this.imagesOfOtherPagesLoaded();
      }
      img.src = this.imagesOfOtherPagesToPreload[i];
    }
  }
  
  imagesOfOtherPagesLoaded(){
    this.numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded++;
    if(this.imagesOfOtherPagesToPreload.length == this.numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded){
      // Comprobacion
      console.log('All images of other pages loaded.');
    }
  }

}
