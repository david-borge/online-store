import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription, take } from 'rxjs';

import { CategoryInterface } from 'src/app/core/models/category.interface';
import { PreloadImagesService } from 'src/app/core/services/preload-images/preload-images.service';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CategoriesActions from '../../store/categories.actions';

@Component({
    standalone: false,
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    host: {
        class: 'app-categories--class-for-router-outlet',
    },
})
export class CategoriesComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);
    private router = inject(Router);
    private preloadImagesService = inject(PreloadImagesService);
    private titleService = inject(Title);

    /*

    Proceso de carga de una página:

    Paso 1. Mostrar el Loading Spinner mientras cargo los datos desde la Base de Datos y las imágenes.

    Paso 2. Cargar los datos (productos, categorías o lo que sea) desde la Base de Datos:
      Paso 2.1. Con pre-fetch, hacer una HTTP Request a la API de Backend para descargar datos desde la Base de Datos. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts
      Paso 2.2. Cuando termine la HTTP Request, guardar los datos en la Store correspondiente.

    Paso 3. Una vez los datos estén en la Store, cargar las imágenes de la página actual (pre-load):
      Paso 3.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de la página actual (usando la directiva de atributo imageLoadDirective en las <img>).
      Paso 3.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), guardar el dato en la Store correspondiente (propiedad numberOfImagesInThisPage).
      Paso 3.3. Cuando se vayan cargando las imágenes de la página actual (ellas solas con <img>), ir apuntándolo en la Store (propiedad numberOfImagesInThisPageLoaded) (usando el ImageLoadDirective > @HostListener('load')).
      Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
    CUIDADO: si en Chrome DevTools > Network tengo marcado "Disable cache", las imágenes se cargarán cada vez que vaya a una ruta, porque no cogerá de caché las que haya cargado antes.

    Paso 4. Una vez las imágenes de la página actual estén descargadas, ocultar el Loading Spinner y mostrar el contenido de la página.

    Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load):
      Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).
      Paso 5.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), comenzar la carga de las imágenes de otras páginas (imagesOfOtherPagesToPreload) (usando el PreloadImagesService).
      Paso 5.3. Cuando hayan cargado las imágenes de alguna de las otras páginas (usando el PreloadImagesService), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded de la Store correspondiente).

  */

    // Suscripciones a la Store
    homeReducerObservableSubscription: Subscription = Subscription.EMPTY;
    categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    allCategories: CategoryInterface[] = [];

    // Proceso de carga de una página: Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load)
    imagesInThisPageLoaded = false;
    imagesOfOtherPagesToPreload: string[] = [];
    homePageImagesLoaded = false; // Proceso de carga de una página: Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).

    // Proceso de carga de una página: Paso 4. Una vez las imágenes de la página actual estén descargadas, ocultar el Loading Spinner y mostrar el contenido de la página.
    // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
    categoriesPagePreviouslyVisited = false;
    currentlyInThePageIEnteredFrom = false;

    ngOnInit(): void {
        // IMPORTANTE: al llegar aquí, las categorias ya están cargadas en la Store porque las he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlas solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts

        // - All Categories
        // Leer datos desde la Store y mostrarlos
        this.categoriesReducerObservableSubscription = this.store
            .select('categoriesReducerObservable')
            .subscribe(
                // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
                (categoriesReducerData) => {
                    // console.log('categoriesReducerData:');
                    // console.log(categoriesReducerData);

                    // - All Categories
                    this.allCategories = categoriesReducerData.allCategories;

                    // Comprobación
                    // console.log('allCategories:');
                    // console.log(this.allCategories);

                    // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de otras páginas
                    if (categoriesReducerData.categoriesPageImagesLoaded) {
                        // Proceso de carga de una página: Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
                        this.imagesInThisPageLoaded =
                            categoriesReducerData.categoriesPageImagesLoaded;

                        // Proceso de carga de una página: Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load)
                        // Proceso de carga de una página: Paso 5.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), comenzar la carga de las imágenes de otras páginas (imagesOfOtherPagesToPreload) (usando el PreloadImagesService).
                        if (!this.homePageImagesLoaded) {
                            // Comprobación
                            // console.log('categories: imagesOfOtherPagesToPreload:');
                            // console.log(this.imagesOfOtherPagesToPreload);

                            this.preloadImagesService.preloadImagesOfOtherPages(
                                this.imagesOfOtherPagesToPreload,
                            );
                        }
                    }

                    // Proceso de carga de una página: Paso 4. Una vez las imágenes de la página actual estén descargadas, ocultar el Loading Spinner y mostrar el contenido de la página.
                    // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
                    this.categoriesPagePreviouslyVisited =
                        categoriesReducerData.categoriesPagePreviouslyVisited;

                    // Comprobación
                    // console.log('categoriesPagePreviouslyVisited: ' + this.homePagePreviouslyVisited);
                },

                // El segundo parámetro de susbscribe() es para recoger los errores del servidor
                (errorResponse) => {
                    // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
                    console.log('errorResponse:');
                    console.log(errorResponse);
                },
            );

        /* - Proceso de carga de una página: Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).
          · Miniaturas de los productos de la home
    */
        this.homeReducerObservableSubscription = this.store
            .select('homeReducerObservable')
            .subscribe(
                // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
                (homeResponseData) => {
                    // console.log('homeResponseData:');
                    // console.log(homeResponseData);

                    // Proceso de carga de una página: Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).
                    this.homePageImagesLoaded = homeResponseData.homePageImagesLoaded;
                    if (!this.homePageImagesLoaded) {
                        // · Miniaturas de los productos de la home
                        if (homeResponseData.allProducts.length != 0) {
                            // Comprobación
                            // console.log('· Miniaturas de las categorías');

                            this.imagesOfOtherPagesToPreload = homeResponseData.allProducts.map(
                                (category) => {
                                    // Con map extraigo un array con los valores de todos los imageThumbnail (y le añado la extensión, comprobando si el navegador soporta webp o no)
                                    return (
                                        category.imageThumbnail +
                                        (this.preloadImagesService.support_format_webp()
                                            ? '.webp'
                                            : '.png')
                                    );
                                },
                            );
                        }
                    }
                },

                // El segundo parámetro de susbscribe() es para recoger los errores del servidor
                (errorResponse) => {
                    // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
                    console.log('errorResponse:');
                    console.log(errorResponse);
                },
            );

        // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
        this.store
            .select('globalReducerObservable')
            .pipe(take(1))
            .subscribe((globalReducerData) => {
                this.currentlyInThePageIEnteredFrom =
                    globalReducerData.firstVisitedPage == this.router.url;

                // Comprobación
                // console.log('Slug de la página de entrada: ' + globalReducerData.firstVisitedPage);
                // console.log('Slug actual: ' + this.router.url);
                // console.log('currentlyInThePageIEnteredFrom: ' + this.currentlyInThePageIEnteredFrom);
            });

        // Cambiar el título de la página
        this.titleService.setTitle('Categories - Online Store');
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.homeReducerObservableSubscription.unsubscribe();
        this.categoriesReducerObservableSubscription.unsubscribe();

        // Guardar en la Store que ya he visitado esta página, así solo ejecuto la animación de carga una vez
        this.store.dispatch(CategoriesActions.SetCategoriesPageHasBeenPrevouslyVisitedToTrue());
    }
}
