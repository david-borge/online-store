import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription, take } from 'rxjs';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as HomeActions from '../../store/home.actions';

import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class:'app-home-class-for-router-outlet',
  },
})
export class HomeComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
  categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  featuredProducts : ProductInterface[] = [];
  dealProducts     : ProductInterface[] = [];

  // Pre-load images of other pages
  imagesInThisPageLoaded: boolean = false;
  imagesOfOtherPagesToPreload: string[] = [];

  // Mostrar los elementos solo cuando estén listos (llamadas HTTP terminadas e imágenes elegidas cargadas)
  homePagePreviouslyVisited: boolean = false;
  
  // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
  currentlyInThePageIEnteredFrom: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private preloadImagesService: PreloadImagesService,
  ) {}


  ngOnInit(): void {

    // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts
    


    // - Home Reducer
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



          // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de otras páginas
          if ( (allProductsResponseData.numberOfImagesInThisPage == allProductsResponseData.numberOfImagesInThisPageLoaded) && (allProductsResponseData.numberOfImagesInThisPage != 0) && (allProductsResponseData.numberOfImagesInThisPageLoaded != 0) ) {
            this.imagesInThisPageLoaded = true;
            this.preloadImagesService.preloadImagesOfOtherPages( allProductsResponseData.numberOfImagesInThisPage, allProductsResponseData.numberOfImagesInThisPageLoaded, this.imagesOfOtherPagesToPreload );
          }



          // - Mostrar los elementos solo cuando estén listos (llamadas HTTP terminadas e imágenes elegidas cargadas)
          this.homePagePreviouslyVisited = allProductsResponseData.homePagePreviouslyVisited;

          // Comprobacion
          // console.log('homePagePreviouslyVisited: ' + this.homePagePreviouslyVisited);

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

            this.imagesOfOtherPagesToPreload = categoriesResponseData.allCategories.map( category => {
              // Con map extraigo un array con los valores de todos los imageThumbnail (y le añado la extensión, comprobando si el navegador soporta webp o no)
              return category.imageThumbnail + ( this.preloadImagesService.support_format_webp() ? '.webp' : '.png' );
            } ); 

          }
            
        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse:');
          console.log(errorResponse);

        }
        
      );



    // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {
      
      this.currentlyInThePageIEnteredFrom = ( globalReducerData.firstVisitedPage == this.router.url );
      
      // Comprobación
      // console.log('Slug de la página de entrada: ' + globalReducerData.firstVisitedPage);
      // console.log('Slug actual: ' + this.router.url);
      // console.log('currentlyInThePageIEnteredFrom: ' + this.currentlyInThePageIEnteredFrom);

    });

  }

  ngOnDestroy():void {

    // Cancelar suscripciones
    this.homeReducerObservableSubscription.unsubscribe();
    this.categoriesReducerObservableSubscription.unsubscribe();

    // Guardar en la Store que ya he visitado esta página, así solo ejecuto la animación de carga una vez
    this.store.dispatch( HomeActions.SetHomePageHasBeenPrevouslyVisitedToTrue() );

  }

}
