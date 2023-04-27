import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { trigger, style, transition, animate } from '@angular/animations';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as LoadingScreenActions from '../../store/loading-screen.actions';

import { PreFetchService } from '../../../../../core/services/prefetch/prefetch.service';
import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  host: {
    class:'app-loading-screen-classes-for-router-outlet'
  },
  // animations: [

  //   // Loading Screen - "Let's begin" button
  //   trigger('animacionLetsBeginButton', [
      
  //     transition('* => *', [
  //       style({ opacity: '0' }),
  //       animate('500ms 0ms cubic-bezier(0.4, 0, 0.4, 1)'),  // animation-duration animation-delay animation-timing-function
  //       // animate('300ms 2100ms cubic-bezier(0.4, 0, 0.4, 1)'),  // animation-duration animation-delay animation-timing-function
  //     ]),

  //   ]),
    
  // ],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  loadingScreenReducerObservableSubscription: Subscription = Subscription.EMPTY;
  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
  categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template

  // Loading Screen - "Let's begin" button - Animation
  // Hago la animación como una Angular Animation en lugar de como una CSS Animation para poder desactivar el botón hasta que esté visible.
  letsBeginButtonIsDisabled: boolean = true;

  // Pre-load images of other pages
  imagesInThisPageLoaded: boolean = false;
  imagesOfHomePageToPreload: string[] = [];
  imagesOfCategoriesPageToPreload: string[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private preFetchService: PreFetchService,
    private preloadImagesService: PreloadImagesService,
  ) { }

  ngOnInit(): void {
    
    /* - Sacar la lista de imágenes de otras páginas to pre-load:
        · Miniaturas de los productos
        · Miniaturas de las categorías
    */

    // · Miniaturas de los productos
    this.homeReducerObservableSubscription = this.store.select('homeReducerObservable')
    .subscribe(

      // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
      (allProductsResponseData)  => {

        // console.log('allProductsResponseData:');
        // console.log(allProductsResponseData);

        // · Miniaturas de los productos
        if ( allProductsResponseData.allProducts.length != 0 ) {

          // Comprobacion
          // console.log('· Miniaturas de los productos');

          this.imagesOfHomePageToPreload = allProductsResponseData.allProducts.map( product => {
            // Con map extraigo un array con los valores de todos los imageThumbnail (y le añado la extensión, comprobando si el navegador soporta webp o no)
            return product.imageThumbnail + ( this.preloadImagesService.support_format_webp() ? '.webp' : '.png' );
          } ); 

          // Comprobacion
          // console.log('homeReducerObservable > imagesOfHomePageToPreload:');
          // console.log(this.imagesOfHomePageToPreload);

          // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de la Categories page
          if ( (allProductsResponseData.numberOfImagesInThisPage == allProductsResponseData.numberOfImagesInThisPageLoaded) && (allProductsResponseData.numberOfImagesInThisPage != 0) && (allProductsResponseData.numberOfImagesInThisPageLoaded != 0) ) {
            this.imagesInThisPageLoaded = true;
            this.preloadImagesService.preloadImagesOfOtherPages( allProductsResponseData.numberOfImagesInThisPage, allProductsResponseData.numberOfImagesInThisPageLoaded, this.imagesOfHomePageToPreload );
          }

        }
          
      },

      // El segundo parámetro de susbscribe() es para recoger los errores del servidor
      (errorResponse) => {
        
        // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
        console.log('errorResponse:');
        console.log(errorResponse);

      }
      
    );

    // · Miniaturas de las categorías
    this.categoriesReducerObservableSubscription = this.store.select('categoriesReducerObservable')
    .subscribe(

      // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
      (allCategoriesResponseData)  => {

        // console.log('allCategoriesResponseData:');
        // console.log(allCategoriesResponseData);

        // · Miniaturas de las categorías
        if ( allCategoriesResponseData.allCategories.length != 0 ) {

          // Comprobacion
          // console.log('· Miniaturas de las categorías');

          this.imagesOfCategoriesPageToPreload = allCategoriesResponseData.allCategories.map( category => {
            // Con map extraigo un array con los valores de todos los imageThumbnail (y le añado la extensión, comprobando si el navegador soporta webp o no)
            return category.imageThumbnail + ( this.preloadImagesService.support_format_webp() ? '.webp' : '.png' );
          } ); 

          // Comprobacion
          // console.log('categoriesReducerObservable > imagesOfCategoriesPageToPreload:');
          // console.log(this.imagesOfCategoriesPageToPreload);

          // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de la Categories page
          if ( (allCategoriesResponseData.numberOfImagesInThisPage == allCategoriesResponseData.numberOfImagesInThisPageLoaded) && (allCategoriesResponseData.numberOfImagesInThisPage != 0) && (allCategoriesResponseData.numberOfImagesInThisPageLoaded != 0) ) {
            this.imagesInThisPageLoaded = true;
            this.preloadImagesService.preloadImagesOfOtherPages( allCategoriesResponseData.numberOfImagesInThisPage, allCategoriesResponseData.numberOfImagesInThisPageLoaded, this.imagesOfCategoriesPageToPreload );
          }

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

  // Loading Screen - "Let's begin" button - Animation End - Activar el botón cuando la animación termina (para que no se pueda hacer click mientras es invisible)
  // No me hace falta recibir el evento
  animacionLetsBeginButtonEnded() {
    this.letsBeginButtonIsDisabled = false;
  }

  // Loading Screen - "Let's begin" button - onClick - Navigate to Home Page
  onClickLetsBeginButton() {
    
    // Ir a la Home Page
    this.router.navigate(['/home']); // Ruta absoluta

  }

  prefetch(elementosAprefetch: string[]): void {

    this.preFetchService.prefetchList( elementosAprefetch );

  }

  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.loadingScreenReducerObservableSubscription.unsubscribe();
    this.homeReducerObservableSubscription.unsubscribe();
    this.categoriesReducerObservableSubscription.unsubscribe();

  }

}
