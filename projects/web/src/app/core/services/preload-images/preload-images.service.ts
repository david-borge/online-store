import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadImagesService {

  preloadImagesOfOtherPages(imagesOfOtherPagesToPreload: string[], numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded: number): void {

    // Recorrer el listado de imágenes
    for(let i = 0; i < imagesOfOtherPagesToPreload.length; i++) {

      // Crear un elemento de imagen
      let img = new Image();

      img.onload = () => {
        
        // Cuando la imagen haya sido cargada
        numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded++;

        // Si toda las imágenes han sido cargadas
        if( imagesOfOtherPagesToPreload.length == numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded ) {

          // Comprobacion
          console.log('All the images of other pages have been loaded (' + numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded + ' ' + ((numberOfImagesOfOtherPagesimagesOfOtherPagesLoaded == 1) ? 'image' : 'images') + ').');

        }
        
      }

      img.src = imagesOfOtherPagesToPreload[i];

    }

  }
  
}
