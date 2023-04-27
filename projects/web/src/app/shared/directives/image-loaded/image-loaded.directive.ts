// Fuente: https://stackoverflow.com/questions/43301624/angular-img-loading-directive



import { Directive, ElementRef, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';
import * as ProductActions from '../../../features/ecommerce/product/store/product.actions';

@Directive({
  selector: '[imageLoadedDirective]'
})
export class ImageLoadedDirective {

  currentURL: string = '';
  homePageImagesLoaded: boolean = false;
  categoriesPageImagesLoaded: boolean = false;
  productPageImagesLoaded: boolean = false;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private elementRef: ElementRef, // (Opcional)
  ) {

    // Cuando lea una imagen con el atributo imageLoadedDirective
    
    
    // Comprobación
    // console.log('ImageLoadedDirective activada.');

    // - Leer en qué página estoy
    this.currentURL = this.router.url;
    
    // Comprobación
    // console.log('currentURL: ' + this.currentURL);

    // - Efectuo una acción u otra dependiendo de en qué página esté
    if( this.currentURL.includes('/product/') ) {
      this.currentURL = '/product';
    }

    switch (this.currentURL) {

      case '/home':

        // Leo de la Store si ya se han cargado las imágenes de la Home page
        this.store.select('homeReducerObservable').subscribe( homeReducerData => {
          this.homePageImagesLoaded = homeReducerData.homePageImagesLoaded;
        } );

        // Leo de la Store si ya se han cargado las imágenes de la Categories page
        this.store.select('categoriesReducerObservable').subscribe( categoriesReducerData => {
          this.categoriesPageImagesLoaded = categoriesReducerData.categoriesPageImagesLoaded;
        } );
        
        // Comprobación
        // console.log('homePageImagesLoaded: ' + this.homePageImagesLoaded);

        // Aumentar el número de imágenes de la Home page, que está guardado en la Store (si las imágenes de la Home page todavía no se han cargado)
        if ( !this.homePageImagesLoaded ) {
          this.store.dispatch( HomeActions.CountImagesInThisPage() );
        }
        
        break;

      case '/categories':
        
        // Leo de la Store si ya se han cargado las imágenes de la Categories page
        this.store.select('categoriesReducerObservable').subscribe( categoriesReducerData => {
          this.categoriesPageImagesLoaded = categoriesReducerData.categoriesPageImagesLoaded;
        } );
        
        // Comprobación
        // console.log('categoriesPageImagesLoaded: ' + this.categoriesPageImagesLoaded);

        // Aumentar el número de imágenes de la Categories page, que está guardado en la Store (si las imágenes de la Categories page todavía no se han cargado)
        if ( !this.categoriesPageImagesLoaded ) {
          this.store.dispatch( CategoriesActions.CountImagesInThisPage() );
        }

        break;

      case '/product':

        // Comprobacion
        // console.log('En página de producto.');
        
        // Leo de la Store si ya se han cargado las imágenes de la Product page
        this.store.select('productReducerObservable').subscribe( productReducerData => {
          this.productPageImagesLoaded = productReducerData.productPageImagesLoaded;
        } );
        
        // Comprobación
        // console.log('productPageImagesLoaded: ' + this.productPageImagesLoaded);

        // Aumentar el número de imágenes de la Product page, que está guardado en la Store (si las imágenes de la Product page todavía no se han cargado)
        if ( !this.productPageImagesLoaded ) {
          this.store.dispatch( ProductActions.CountImagesInThisPage() );
        }

        break;
    
      default:
        break;

    }
    
  }

  // Cuando una imagen se haya cargado
  @HostListener('load') onLoad(): void {
    
    // Comprobacion
    // console.log('Imagen cargada.');
    
    
    // - Efectuo una acción u otra dependiendo de en qué página esté

    if( this.currentURL.includes('/product/') ) {
      this.currentURL = '/product';
    }

    switch (this.currentURL) {
      
      case '/home':

        // Comprobacion
        // console.log('homePageImagesLoaded: ' + this.homePageImagesLoaded);

        // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
        if ( !this.homePageImagesLoaded ) {
          this.store.dispatch( HomeActions.CountImagesInThisPageLoaded() );
        }

        break;
      
      case '/categories':

        // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
        if ( !this.categoriesPageImagesLoaded ) {
          this.store.dispatch( CategoriesActions.CountImagesInThisPageLoaded() );
        }

        break;
      
      case '/product':

        // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
        if ( !this.productPageImagesLoaded ) {
          this.store.dispatch( ProductActions.CountImagesInThisPageLoaded() );
        }

        break;

      
      default:
        break;

    }
    
  }

  // (Opcional) Cuando haya un error al cargar una imagen (porque src no es correcto o la imagen no existe, por ejemplo)
  @HostListener('error') onError() {
    
    // Comprobación: elemento que tiene el atributo imageLoadedDirective. Puedo acceder a sus propiedades (como src o class).
    // console.log('elementRef:');
    // console.log(this.elementRef);

    console.log('Error al cargar una imagen: ' + this.elementRef.nativeElement.src);

  }

}