import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';
import { PreloadImagesService } from 'projects/web/src/app/core/services/preload-images/preload-images.service';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx

@Component({
    standalone: false,
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    host: {
        class: 'app-category--class-for-router-outlet',
    },
})
export class CategoryComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);
    private router = inject(Router);
    private preloadImagesService = inject(PreloadImagesService);

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
    categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    currentCategorySlug = '';
    currentCategory = {} as CategoryInterface;

    // Proceso de carga de una página: Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load)
    imagesInThisPageLoaded = false;
    imagesOfOtherPagesToPreload: string[] = []; // Proceso de carga de una página: Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).
    categoriesPageImagesLoaded = false; // Proceso de carga de una página: Paso 5.1. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), sacar el listado de imágenes de otras páginas que quiero cargar (imagesOfOtherPagesToPreload).

    // Proceso de carga de una página: Paso 4. Una vez las imágenes de la página actual estén descargadas, ocultar el Loading Spinner y mostrar el contenido de la página.
    // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
    categoriesPagePreviouslyVisited = false;
    currentlyInThePageIEnteredFrom = false;

    ngOnInit(): void {
        // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts

        // - Categories Reducer
        // Leer datos desde la Store y mostrarlos
        // Slug de la categoría actual
        this.categoriesReducerObservableSubscription = this.store
            .select('categoriesReducerObservable')
            .subscribe(
                // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
                (categoriesReducerData) => {
                    // console.log('categoriesReducerData get:');
                    // console.log(categoriesReducerData);

                    // Cojo el valor del slug de la categoría actual y lo guardo en la variable de este componente para poder mostrar el título y el color de fondo apropiados en el header
                    this.currentCategorySlug = categoriesReducerData.currentCategorySlug;

                    // Filtro las categorías - Categoría con el slug actual
                    this.currentCategory = categoriesReducerData.allCategories.filter(
                        // Cada categoría
                        (category: CategoryInterface) => {
                            // Criterio para mostrar o no cada categoría
                            return category.slug == this.currentCategorySlug;
                        },
                    )[0]; // Primer y único elemento del array, que es la categoría actual

                    // Comprobación
                    // console.log('currentCategory:');
                    // console.log(this.currentCategory);

                    // Comprobación
                    // console.log('CategoryComponent > currentCategorySlug: ' + this.currentCategory.slug);
                    // console.log('CategoryComponent > currentCategoryName: ' + this.currentCategory.name);
                    // console.log('CategoryComponent > currentCategorycardAndHeaderBackgroundColor: ' + this.currentCategory.cardBackgroundColor);

                    // - Si se han cargado todas las imágenes de esta página, mostrar el contenido de esta página y comenzar a cargar las imágenes de otras páginas
                    if (categoriesReducerData.categoriesPageImagesLoaded) {
                        // Proceso de carga de una página: Paso 3.4. Cuando termine la carga de las imágenes de la página actual (en la Store: numberOfImagesInThisPage == numberOfImagesInThisPageLoaded), guardarlo en la Store correspondiente (propiedad xxxPageImagesLoaded=true) (y cambiar el valor en el componente).
                        this.imagesInThisPageLoaded =
                            categoriesReducerData.categoriesPageImagesLoaded;

                        // Proceso de carga de una página: Paso 5. Una vez se haya mostrado el contenido de la página, ir cargando las imágenes de otras páginas (pre-load)
                        // Proceso de carga de una página: Paso 5.2. Si no se han cargado ya (propiedad xxxPageImagesLoaded=false), comenzar la carga de las imágenes de otras páginas (imagesOfOtherPagesToPreload) (usando el PreloadImagesService).
                        if (!this.categoriesPageImagesLoaded) {
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
                    // this.categoriesPagePreviouslyVisited = categoriesReducerData.categoriesPagePreviouslyVisited;

                    // Comprobación
                    // console.log('categoryPagePreviouslyVisited: ' + this.categoryPagePreviouslyVisited);
                },

                // El segundo parámetro de susbscribe() es para recoger los errores del servidor
                (errorResponse) => {
                    // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
                    console.log('errorResponse:');
                    console.log(errorResponse);
                },
            );
    }

    ngOnDestroy(): void {
        // Cancelar suscripciones
        this.categoriesReducerObservableSubscription.unsubscribe();

        // Guardar en la Store que ya he visitado esta página, así solo ejecuto la animación de carga una vez
        // this.store.dispatch( CategoryActions.SetHomePageHasBeenPrevouslyVisitedToTrue() );
    }
}
