// Fuente: https://stackoverflow.com/questions/43301624/angular-img-loading-directive



import { Directive, ElementRef, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';

@Directive({
  selector: '[imageLoadedDirective]'
})
export class ImageLoadedDirective {

  lastActiveMainPage: string | null = '';
  homePageImagesLoaded: boolean = false;
  categoriesPageImagesLoaded: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private elementRef: ElementRef, // (Opcional)
  ) {
    
    // Comprobación
    // console.log('ImageLoadedDirective activada.');

    // - Leer de la Store en qué página estoy
    this.store.select('globalReducerObservable').subscribe( globalReducerData => { this.lastActiveMainPage = globalReducerData.lastActiveMainPage; } );
    
    // Comprobación
    console.log('lastActiveMainPage: ' + this.lastActiveMainPage);

    // - Efectuo una acción u otra dependiendo de en qué página esté
    switch (this.lastActiveMainPage) {

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
    
      default:
        break;

    }
    
  }

  // Cuando una imagen se haya cargado
  @HostListener('load') onLoad(): void {
    
    // Comprobacion
    // console.log('Imagen cargada.');
    
    
    // - Efectuo una acción u otra dependiendo de en qué página esté
    switch (this.lastActiveMainPage) {
      
      case '/home':

        // Comprobacion
        console.log('homePageImagesLoaded: ' + this.homePageImagesLoaded);

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