// Fuente: https://stackoverflow.com/questions/43301624/angular-img-loading-directive



import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[imageLoadedDirective]'
})
export class ImageLoadedDirective {

  constructor(
    private elementRef: ElementRef, // (Opcional)
  ) {
    // Comprobación
    // console.log('ImageLoadedDirective activada.');
  }

  // Cuando una imagen se haya cargado
  @HostListener('load') onLoad(): void {
    
    // this.numberOfImagesOfThisPage++;
    
    // Comprobacion
    console.log('Imagen cargada.');
    // console.log('Imagen cargada. + numberOfImagesOfThisPage: '/*  + this.numberOfImagesOfThisPage */);
    
  }

  // (Opcional) Cuando haya un error al cargar una imagen (porque src no es correcto o la imagen no existe, por ejemplo)
  @HostListener('error') onError() {
    
    // Comprobación: elemento que tiene el atributo imageLoadedDirective. Puedo acceder a sus propiedades (como src o class).
    // console.log('elementRef:');
    // console.log(this.elementRef);

    console.log('Error al cargar una imagen: ' + this.elementRef.nativeElement.src);

  }

}