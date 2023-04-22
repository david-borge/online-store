import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadImagesService {

  numberOfimagesOfOtherPagesToPreloadLoaded: number = 0;

  preloadImagesOfOtherPages( numberOfImagesInThisPage: number, numberOfImagesInThisPageLoaded: number, imagesOfOtherPagesToPreload: string[] ): void {

    // Si se han cargado todas las imágenes de esta página, comenzar a cargar las imágenes de otras páginas
    if ( (numberOfImagesInThisPage == numberOfImagesInThisPageLoaded) && (numberOfImagesInThisPage != 0) && (numberOfImagesInThisPageLoaded != 0) ) {

      // Comprobacion
      console.log('Comenzar a cargar las imágenes de otras páginas.');

      // Recorrer el listado de imágenes
      for(let i = 0; i < imagesOfOtherPagesToPreload.length; i++) {

        // Crear un elemento de imagen
        let img = new Image();

        // Cargar la imagen
        img.onload = () => {
          
          // Cuando la imagen haya sido cargada
          this.numberOfimagesOfOtherPagesToPreloadLoaded++;

          // Comprobacion: si toda las imágenes han sido cargadas
          if( imagesOfOtherPagesToPreload.length == this.numberOfimagesOfOtherPagesToPreloadLoaded ) {
            console.log('All the images of other pages have been loaded (' + this.numberOfimagesOfOtherPagesToPreloadLoaded + ' ' + ((this.numberOfimagesOfOtherPagesToPreloadLoaded == 1) ? 'image' : 'images') + ').');
          }
          
        }

        img.src = imagesOfOtherPagesToPreload[i];

      }

    }

  }
  
}
