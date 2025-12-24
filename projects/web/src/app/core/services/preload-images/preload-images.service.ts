import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';
import * as ProductActions from '../../../features/ecommerce/product/store/product.actions';

@Injectable({
    providedIn: 'root',
})
export class PreloadImagesService {
    numberOfimagesOfOtherPagesToPreloadLoaded: number = 0;
    currentURL: string = '';

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>,
    ) {}

    // Proceso de carga de una página: Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load)
    preloadImagesOfOtherPages(imagesOfOtherPagesToPreload: string[]): void {
        // Si las imágenes de otras páginas no se han cargado todavía, comienzo a cargarlas
        if (imagesOfOtherPagesToPreload.length != this.numberOfimagesOfOtherPagesToPreloadLoaded) {
            // Comprobación
            // console.log('Imágenes de esta página cargadas. Comenzar a cargar las imágenes de otras páginas.');

            // Proceso de carga de una página: Paso 5.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), comenzar la carga de las imágenes de otras páginas (imagesOfOtherPagesToPreload) (usando el PreloadImagesService).
            // Recorrer el listado de imágenes
            for (let i = 0; i < imagesOfOtherPagesToPreload.length; i++) {
                // Crear un elemento de imagen
                let img = new Image();

                // Cargar la imagen
                img.onload = () => {
                    // Cuando la imagen haya sido cargada
                    this.numberOfimagesOfOtherPagesToPreloadLoaded++;

                    // Comprobación: si toda las imágenes han sido cargadas
                    if (
                        imagesOfOtherPagesToPreload.length ==
                        this.numberOfimagesOfOtherPagesToPreloadLoaded
                    ) {
                        // Comprobación
                        // console.log('All the images of other pages have been loaded (' + this.numberOfimagesOfOtherPagesToPreloadLoaded + ' ' + ((this.numberOfimagesOfOtherPagesToPreloadLoaded == 1) ? 'image' : 'images') + ').');

                        // - Leer en qué página estoy
                        this.currentURL = this.router.url;

                        // Comprobación
                        // console.log('currentURL: ' + this.currentURL);

                        // Proceso de carga de una página: Paso 5.3. Cuando hayan cargado las imágenes de alguna de las otras páginas (usando el PreloadImagesService), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded de la Store correspondiente).
                        if (this.currentURL.includes('/product/')) {
                            this.currentURL = '/product';
                        }

                        switch (this.currentURL) {
                            // Si estoy en la home, pre-cargo las imágenes de Categories
                            case '/home':
                                this.store.dispatch(
                                    CategoriesActions.SetCategoriesPageImagesLoadedToTrue(),
                                );
                                break;

                            // Si estoy en categories, pre-cargo las imágenes de Home
                            case '/categories':
                                this.store.dispatch(HomeActions.SetHomePageImagesLoadedToTrue());
                                break;

                            // TODO:
                            case '/product':
                                // Comprobación
                                // console.log('aquí');
                                this.store.dispatch(
                                    ProductActions.SetProductPageImagesLoadedToTrue(),
                                );
                                break;

                            default:
                                break;
                        }
                    }
                };

                img.src = imagesOfOtherPagesToPreload[i];
            }
        }
    }

    // Comprobar si el navegador soporta imágenes en webp
    support_format_webp(): boolean {
        var elem = document.createElement('canvas');

        if (!!(elem.getContext && elem.getContext('2d'))) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        } else {
            // very old browser like IE 8, canvas not supported
            return false;
        }
    }
}
