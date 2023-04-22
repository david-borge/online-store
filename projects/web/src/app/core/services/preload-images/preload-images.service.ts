import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadImagesService {

  numberOfimagesOfOtherPagesToPreloadLoaded: number = 0;

  preloadImagesOfOtherPages( numberOfImagesInThisPage: number, numberOfImagesInThisPageLoaded: number, imagesOfOtherPagesToPreload: string[] ): void {

    // Si las imágenes de otras páginas no se han cargado todavía, comienzo a cargarlas
    if( imagesOfOtherPagesToPreload.length != this.numberOfimagesOfOtherPagesToPreloadLoaded ) {

      // Comprobacion
      // console.log('Imágenes de esta página cargadas. Comenzar a cargar las imágenes de otras páginas.');

      // Recorrer el listado de imágenes
      for(let i = 0; i < imagesOfOtherPagesToPreload.length; i++) {

        // Crear un elemento de imagen
        let img = new Image();

        // Cargar la imagen
        img.onload = () => {
          
          // Cuando la imagen haya sido cargada
          this.numberOfimagesOfOtherPagesToPreloadLoaded++;

          // Comprobacion: si toda las imágenes han sido cargadas
          /* if( imagesOfOtherPagesToPreload.length == this.numberOfimagesOfOtherPagesToPreloadLoaded ) {
            console.log('All the images of other pages have been loaded (' + this.numberOfimagesOfOtherPagesToPreloadLoaded + ' ' + ((this.numberOfimagesOfOtherPagesToPreloadLoaded == 1) ? 'image' : 'images') + ').');
          } */
          
        }

        img.src = imagesOfOtherPagesToPreload[i];

      }

    }

  }

  // Comprobar si el navegador soporta imágenes en webp
  support_format_webp(): boolean {
    
    var elem = document.createElement('canvas');

    if ( !!(elem.getContext && elem.getContext('2d')) ) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    else {
      // very old browser like IE 8, canvas not supported
      return false;
    }

  }
  
}
