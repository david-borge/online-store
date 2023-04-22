// Fuente: https://stackoverflow.com/questions/43301624/angular-img-loading-directive



import { Directive, ElementRef, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';

@Directive({
  selector: '[imageLoadedDirective]'
})
export class ImageLoadedDirective {

  constructor(
    private store: Store<fromApp.AppState>,
    private elementRef: ElementRef, // (Opcional)
  ) {
    
    // Comprobación
    // console.log('ImageLoadedDirective activada.');

    // Aumentar el número de imágenes de la página, que está guardado en la Store
    this.store.dispatch( HomeActions.CountImagesInThisPage() );
    
  }

  // Cuando una imagen se haya cargado
  @HostListener('load') onLoad(): void {
    
    // Comprobacion
    // console.log('Imagen cargada.');
    
    // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store
    this.store.dispatch( HomeActions.CountImagesInThisPageLoaded() );
    
  }

  // (Opcional) Cuando haya un error al cargar una imagen (porque src no es correcto o la imagen no existe, por ejemplo)
  @HostListener('error') onError() {
    
    // Comprobación: elemento que tiene el atributo imageLoadedDirective. Puedo acceder a sus propiedades (como src o class).
    // console.log('elementRef:');
    // console.log(this.elementRef);

    console.log('Error al cargar una imagen: ' + this.elementRef.nativeElement.src);

  }

}