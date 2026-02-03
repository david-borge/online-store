// Fuente: https://stackoverflow.com/questions/43301624/angular-img-loading-directive
// Proceso de carga de una página: Paso 3.1. Sacar el listado de imágenes de la página actual (usando la directiva de atributo appImageLoadDirective en las <img>).

import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CategoriesActions from '@features/ecommerce/categories/store/categories.actions';
import * as HomeActions from '@features/ecommerce/home/store/home.actions';
import * as ProductActions from '@features/ecommerce/product/store/product.actions';

@Directive({ standalone: false, selector: '[appImageLoadDirective]' })
export class ImageLoadDirective {
    private readonly router = inject(Router);
    private readonly store = inject<Store<fromApp.AppState>>(Store);
    private readonly elementRef = inject(ElementRef);

    currentURL = '';
    numberOfImagesInThisPage = 0;
    numberOfImagesInThisPageLoaded = 0;

    homePageImagesLoaded = false;
    categoriesPageImagesLoaded = false;
    productPageImagesLoaded = false;

    constructor() {
        // - Cuando lea una imagen con el atributo appImageLoadDirective (ocurre cada vez que voy al componente)

        // Comprobación
        // console.log('ImageLoadDirective activada.');

        // - Leer en qué página estoy
        this.currentURL = this.router.url;

        // Comprobación
        // console.log('currentURL: ' + this.currentURL);

        // Home Store
        this.store.select('homeReducerObservable').subscribe((homeReducerData) => {
            // Proceso de carga de una página: Paso 3.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=true), sacar el listado de imágenes de la página actual (usando la directiva de atributo appImageLoadDirective en las <img>).
            this.homePageImagesLoaded = homeReducerData.homePageImagesLoaded;

            // Proceso de carga de una página: Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
            this.numberOfImagesInThisPage = homeReducerData.numberOfImagesInThisPage;
            this.numberOfImagesInThisPageLoaded = homeReducerData.numberOfImagesInThisPageLoaded;
        });

        // Categories Store
        this.store.select('categoriesReducerObservable').subscribe((categoriesReducerData) => {
            // Proceso de carga de una página: Paso 3.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=true), sacar el listado de imágenes de la página actual (usando la directiva de atributo appImageLoadDirective en las <img>).
            this.categoriesPageImagesLoaded = categoriesReducerData.categoriesPageImagesLoaded;

            // Proceso de carga de una página: Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
            this.numberOfImagesInThisPage = categoriesReducerData.numberOfImagesInThisPage;
            this.numberOfImagesInThisPageLoaded =
                categoriesReducerData.numberOfImagesInThisPageLoaded;
        });

        // - Proceso de carga de una página: Paso 3.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=true), sacar el listado de imágenes de la página actual (usando la directiva de atributo appImageLoadDirective en las <img>).
        // Leo de la Store si ya se han cargado las imágenes de la Product page
        this.store.select('productReducerObservable').subscribe((productReducerData) => {
            this.productPageImagesLoaded = productReducerData.productPageImagesLoaded;
        });

        // - Proceso de carga de una página: Paso 3.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
        // Efectuo una acción u otra dependiendo de en qué página esté
        if (this.currentURL.includes('/product/')) {
            this.currentURL = '/product';
        }

        switch (this.currentURL) {
            case '/home':
                // Comprobación
                // console.log('ImageLoadDirective > homePageImagesLoaded: ' + this.homePageImagesLoaded);

                // - Proceso de carga de una página: Paso 3.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
                // Aumentar el número de imágenes de la Home page, que está guardado en la Store (si las imágenes de la Home page todavía no se han cargado)
                if (!this.homePageImagesLoaded) {
                    this.store.dispatch(HomeActions.IncrementInOneTheNumberOfImagesInThisPage());
                }

                break;

            case '/categories':
                // Comprobación
                // console.log('ImageLoadDirective > categoriesPageImagesLoaded: ' + this.categoriesPageImagesLoaded);

                // - Proceso de carga de una página: Paso 3.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
                // Aumentar el número de imágenes de la Categories page, que está guardado en la Store (si las imágenes de la Categories page todavía no se han cargado)
                if (!this.categoriesPageImagesLoaded) {
                    this.store.dispatch(
                        CategoriesActions.IncrementInOneTheNumberOfImagesInThisPage(),
                    );
                }

                break;

            case '/product':
                // Comprobación
                // console.log('En página de producto.');

                // Comprobación
                // console.log('ImageLoadDirective > productPageImagesLoaded: ' + this.productPageImagesLoaded);

                // - Proceso de carga de una página: Paso 3.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
                // Aumentar el número de imágenes de la Product page, que está guardado en la Store (si las imágenes de la Product page todavía no se han cargado)
                if (!this.productPageImagesLoaded) {
                    this.store.dispatch(ProductActions.IncrementInOneTheNumberOfImagesInThisPage());
                }

                break;

            default:
                break;
        }
    }

    // Cuando una imagen se haya cargado
    @HostListener('load') onLoad(): void {
        // Comprobación
        // console.log('ImageLoadDirective > Imagen cargada.');

        // - Efectuo una acción u otra dependiendo de en qué página esté

        if (this.currentURL.includes('/product/')) {
            this.currentURL = '/product';
        }

        switch (this.currentURL) {
            case '/home':
                // Comprobación
                // console.log('homePageImagesLoaded: ' + this.homePageImagesLoaded);

                // Proceso de carga de una página: Paso 3.3. Cuando se vayan cargando las imágenes de la página actual (ellas solas con <img>), ir apuntándolo en la Store (propiedad numberOfImagesInThisPageLoaded) (usando el ImageLoadDirective > @HostListener('load')).
                // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
                if (!this.homePageImagesLoaded) {
                    this.store.dispatch(
                        HomeActions.IncrementInOneTheNumberOfImagesInThisPageLoaded(),
                    );
                }

                // Proceso de carga de una página: Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
                if (
                    this.numberOfImagesInThisPage == this.numberOfImagesInThisPageLoaded &&
                    this.numberOfImagesInThisPage != 0 &&
                    this.numberOfImagesInThisPageLoaded != 0
                ) {
                    this.store.dispatch(HomeActions.SetHomePageImagesLoadedToTrue());
                }

                break;

            case '/categories':
                // Comprobación
                // console.log('categoriesPageImagesLoaded: ' + this.categoriesPageImagesLoaded);

                // Proceso de carga de una página: Paso 3.3. Cuando se vayan cargando las imágenes de la página actual (ellas solas con <img>), ir apuntándolo en la Store (propiedad numberOfImagesInThisPageLoaded) (usando el ImageLoadDirective > @HostListener('load')).
                // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
                if (!this.categoriesPageImagesLoaded) {
                    this.store.dispatch(
                        CategoriesActions.IncrementInOneTheNumberOfImagesInThisPageLoaded(),
                    );
                }

                if (
                    this.numberOfImagesInThisPage == this.numberOfImagesInThisPageLoaded &&
                    this.numberOfImagesInThisPage != 0 &&
                    this.numberOfImagesInThisPageLoaded != 0
                ) {
                    this.store.dispatch(CategoriesActions.SetCategoriesPageImagesLoadedToTrue());
                }

                break;

            case '/product':
                // Proceso de carga de una página: Paso 3.3. Cuando se vayan cargando las imágenes de la página actual (ellas solas con <img>), ir apuntándolo en la Store (propiedad numberOfImagesInThisPageLoaded) (usando el ImageLoadDirective > @HostListener('load')).
                // Aumentar el número de imágenes de la página que han sido cargadas, que está guardado en la Store (si las imágenes todavía no se han cargado)
                if (!this.productPageImagesLoaded) {
                    this.store.dispatch(
                        ProductActions.IncrementInOneTheNumberOfImagesInThisPageLoaded(),
                    );
                }

                break;

            default:
                break;
        }
    }

    // (Opcional) Cuando haya un error al cargar una imagen (porque src no es correcto o la imagen no existe, por ejemplo)
    @HostListener('error') onError() {
        // Comprobación: elemento que tiene el atributo appImageLoadDirective. Puedo acceder a sus propiedades (como src o class).
        // console.log('elementRef:');
        // console.log(this.elementRef);

        console.log(
            'ImageLoadDirective > error al cargar una imagen: ' + this.elementRef.nativeElement.src,
        );
    }

    // Nota: en las Directives, no hace falta hacer unsubscribe de los Observables.
}
