import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {
    class:'app-cart-class-for-router-outlet',
  },
})
export class CartComponent {

  /*
  
    Proceso de carga de una página:

    Paso 1. Mostrar el Loading Spinner mientras cargo los datos desde la Base de Datos y las imágenes.

    Paso 2. Cargar los datos (productos, categorías o lo que sea) desde la Base de Datos:
      Paso 2.1. Si no está ya guardado en la Store, hacer una HTTP Request a la API de Backend para descargar datos desde la Base de Datos.
      Paso 2.2. Cuando termine la HTTP Request, guardar los datos en la Store correspondiente.

    Paso 3. Una vez los datos estén en la Store, cargar las imágenes de la página actual (pre-load):
      Paso 3.1. Sacar el listado de imágenes de la página actual (usando la directiva de atributo imageLoadedDirective en las <img>).
      Paso 3.2. Guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
      Paso 3.3. Comenzar la carga de las imágenes de la página actual (pre-load) (usando el PreloadImagesService).
      Paso 3.4. Cuando se vayan cargando las imágenes de la página actual, ir guardando en la Store correspondiente el número total de imágenes de esta página guardadas (propiedad numberOfImagesInThisPageLoaded).
      Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true).
    
    Paso 4. Una vez las imágenes de la página actual estén descargados, ocultar el Loading Spinner y mostrar el contenido de la página.

    Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load):
      Paso 5.1. Sacar la lista de imágenes que quiero cargar (desde la Store o HTTP Requests), teniendo en cuenta si no se han cargado ya (propiedad xxxPageImagesLoaded=true).
      Paso 5.2. Comenzar la carga de las imágenes de otras páginas (pre-load) (usando el PreloadImagesService).
      Paso 5.3. Cuando se vayan cargando las imágenes de otras páginas, ir guardando en la Store correspondiente el número total de imágenes de esta página guardadas (propiedad numberOfImagesInThisPageLoaded).
      Paso 3.4. Cuando termine la carga de las imágenes alguna de las otras páginas (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true).

    TODO: ¿Cómo funcionaba esto?: prefetch.directive.ts

  */

  // TODO:
  numberOfProductsInCart :number = 2;

}
