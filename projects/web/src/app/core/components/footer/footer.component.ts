import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { take } from 'rxjs';

import * as CartActions from '../../../features/ecommerce/cart/store/cart.actions';
import { ProcessStatus } from '../../models/processStatus.enum';
import { ProductInterface } from '../../models/product.interface';
import { PreFetchService } from '../../services/prefetch/prefetch.service';
import { RoutingService } from '../../services/routing/routing.service';
import * as fromApp from '../../store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../store/global.actions';


@Component({
    standalone: false,
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges {
    // Propiedades - Footer - Navigation CTAs & Copy
    @Input() navigationShowCtasAndCopy = false;
    currentURL = '';

    // Propiedades - Footer - Navigation CTAs & Copy - Navigation Copy
    @Input() navigationShowCopy = true;
    @Input() navigationCopyLabel = '';
    @Input() navigationCopyPrice = 0;
    numberOfProductsInCart = 2;

    // Propiedades - Footer - Navigation CTAs & Copy - Navigation Button Right
    @Input() navigationButtonRightText = '';
    @Input() navigationButtonRightURL = '';
    @Input() navigationButtonRightClasses = 'btn btn-primary btn-lg';
    @Input() navigationShowButtonRightRightIcon = false;
    @Input() navigationShowButtonRightRightIconType = 'check';

    // Propiedades - Footer - Navigation CTAs & Copy - Navigation Item
    activeNavigationItem: string | null = '';
    lastActiveMainPage: string | null = '';

    processStatus: ProcessStatus = ProcessStatus.NOT_STARTED;

    constructor(
        private router: Router,
        private preFetchService: PreFetchService,
        private routingService: RoutingService,
        private store: Store<fromApp.AppState>,
    ) {
        // Al cambiar de ruta, indicarlo en la Store Global
        this.routingService.SetFirstVisitedPage();
    }

    ngOnInit(): void {
        // - Leer en qué URL estoy
        this.currentURL = this.router.url;

        this.store.select('cartReducerObservable').subscribe((cartReducerData) => {
            // Si estoy en el CarRouterModule.t, leer de la Cart Store el número de productos en el carrito
            if (this.currentURL.includes('/cart')) {
                this.numberOfProductsInCart = cartReducerData.cartData.length;

                // Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
                if (this.numberOfProductsInCart == 0) {
                    this.navigationButtonRightText = 'Explore the Store';
                    this.navigationButtonRightURL = '/home';
                }

                // Si el carrito no está vacío, ir al checkout
                else {
                    this.navigationButtonRightText = 'Checkout';
                    this.navigationButtonRightURL = '/checkout';
                }
            }

            this.processStatus = cartReducerData.addProductToCartStatus;
        });

        // - Leer de la Store la última página principal visitada (lastActiveMainPage)
        this.store
            .select('globalReducerObservable')
            .pipe(take(1))
            .subscribe((globalReducerData) => {
                this.lastActiveMainPage = globalReducerData.lastActiveMainPage;
            });

        // Leer de Local Storage la última página principal visitada (lastActiveMainPage) y guardarlo en la Store
        // this.store.dispatch( GlobalActions.GetLocalStorageValueStart({ localStorageKeyPayload: 'lastActiveMainPage', }));

        // - Guardar en la Store el Navigation Item activo

        // Comprobación
        // console.log('activeNavigationItem: ' + this.activeNavigationItem + ' - lastActiveMainPage: ' + this.lastActiveMainPage);

        // · Si aterrizo en una de las páginas principales
        if (
            this.currentURL == '/home' ||
            this.currentURL == '/categories' ||
            this.currentURL == '/cart' ||
            this.currentURL == '/account'
        ) {
            // Comprobación
            // console.log('En una página principal: ' + this.currentURL);

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({
                    activeNavigationItemPayload: this.currentURL,
                }),
            );
            this.store.dispatch(
                GlobalActions.SetLocalStorageKeyValue({
                    localStorageKeyPayload: 'lastActiveMainPage',
                    localStorageValuePayload: this.currentURL,
                }),
            );

            this.store.dispatch(
                GlobalActions.GetLocalStorageValueStart({
                    localStorageKeyPayload: 'lastActiveMainPage',
                }),
            );
        }

        // · Si aterrizo en una página de categoría, activo /categories
        else if (this.currentURL.includes('/category/')) {
            // Comprobación
            // console.log('En una página de categoría');

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({
                    activeNavigationItemPayload: '/categories',
                }),
            );
        }

        // · Si estoy en una página de producto habiendo llegado desde la home o desde categorías y recargo la página, debería marcarse la página de home o categorías, según lo que ponga en Local Storage en lastActiveMainPage.
        else if (this.currentURL.includes('/product/') && this.lastActiveMainPage == '') {
            // Comprobación
            // console.log('Si estoy en una página de producto habiendo llegado desde la home o desde categorías y recargo la página, debería marcarse la página de home o categorías, según lo que ponga en Local Storage en lastActiveMainPage.');

            this.store.dispatch(
                GlobalActions.GetLocalStorageValueStart({
                    localStorageKeyPayload: 'lastActiveMainPage',
                }),
            );

            this.store
                .select('globalReducerObservable')
                .pipe(take(1))
                .subscribe((data) => {
                    // Comprobación
                    // console.log('data.lastActiveMainPage: ' + data.lastActiveMainPage);

                    if (data.lastActiveMainPage != null) {
                        this.store.dispatch(
                            GlobalActions.SetActiveNavigationItem({
                                activeNavigationItemPayload: data.lastActiveMainPage,
                            }),
                        );
                    } else {
                        // Por defecto (cuando llego a la página por primera vez desde el Modo Incógnito), muestro la home
                        this.store.dispatch(
                            GlobalActions.SetActiveNavigationItem({
                                activeNavigationItemPayload: '/home',
                            }),
                        );
                    }
                });
        }

        // · Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la home, activo /home
        else if (this.currentURL.includes('/product/') && this.lastActiveMainPage == '/home') {
            // Comprobación
            // console.log('En una página de producto si la última página principal ha sido /home.');

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home' }),
            );
        }

        // · Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la categories, activo /categories
        else if (
            this.currentURL.includes('/product/') &&
            this.lastActiveMainPage == '/categories'
        ) {
            // Comprobación
            // console.log('En una página de producto si la última página principal ha sido /categories.');

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({
                    activeNavigationItemPayload: '/categories',
                }),
            );
        }

        // · Si aterrizo en una interior de Account, como '/orders' o '/order/:order-number' o '/addresses' o '/payment-methods', activo /account
        else if (
            this.currentURL == '/orders' ||
            this.currentURL.includes('/order/') ||
            this.currentURL == '/addresses' ||
            this.currentURL == '/payment-methods'
        ) {
            // Comprobación
            // console.log('En una página interior de Account, como '/orders' o '/order/:order-number' o '/addresses' o '/payment-methods'');

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/account' }),
            );
        }

        // Por defecto (cuando llego a la página por primera vez desde el Modo Incógnito), muestro la home
        else {
            // Comprobación
            // console.log('Por defecto');

            this.store.dispatch(
                GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home' }),
            );
        }

        // - Leer de la Store la última página principal visitada
        this.store
            .select('globalReducerObservable')
            .pipe(take(1))
            .subscribe((globalReducerData) => {
                this.activeNavigationItem = globalReducerData.activeNavigationItem;

                // Comprobación
                // console.log('activeNavigationItem: ' + this.activeNavigationItem);
            });
    }

    onCLickNavigationButtonRight() {
        // Ejecuto una acción u otra dependiendo de en qué página estoy

        // Comprobacion
        // console.log('currentURL: ' + this.currentURL);

        // · Página de un producto: add to cart (añadir al carrito)
        if (this.currentURL.includes('/product/')) {
            // Recuperar de la Cart Store el id del producto que hay que añadir al carrito
            let newProductSlug: ProductInterface['slug'] = '';
            this.store
                .select('homeReducerObservable')
                .pipe(take(1))
                .subscribe((cartReducerData) => {
                    newProductSlug = cartReducerData.currentProductSlug;
                });

            // Add to cart (añadir al carrito)
            this.store.dispatch(
                CartActions.AddProductToCartStart({
                    productSlugPayload: newProductSlug,
                }),
            );
        }

        // · Página de carrito: ir al checkout
        else if (this.currentURL.includes('/cart')) {
            // Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
            this.router.navigate([this.navigationButtonRightURL]);

            // TODO: Si el carrito no está vacío, ir al checkout
        }

        // · Página de Delivery addresses: add new address
        else if (this.currentURL.includes('/addresses')) {
            // Mostrar el "Add new address" overlay
            this.store.dispatch(
                GlobalActions.ShowOrHideBottomOverlay({
                    showBottomOverlayValue: true,
                }),
            );
        }

        // · Página de Payment methods: add new payment method
        else if (this.currentURL.includes('/payment-methods')) {
            // Mostrar el "Add new address" overlay
            this.store.dispatch(
                GlobalActions.ShowOrHideBottomOverlay({
                    showBottomOverlayValue: true,
                }),
            );
        }

        // Navegación
        // this.router.navigate([ this.navigationButtonRightURL ]);
    }

    ngOnChanges() {
        // - Determinar si se debe mostrar .navigation-ctas-and-copy-container (las condiciones varían según la página)

        // Página de un producto
        if (this.currentURL.includes('/product/')) {
            this.navigationShowCtasAndCopy = this.navigationCopyPrice != 0; // Solo mostrar .navigation-ctas-and-copy-container si ya se ha cargado el precio del producto
        }
    }

    // Proceso de carga de una página: Paso 2.1. Con pre-fetch, hacer una HTTP Request a la API de Backend para descargar datos desde la Base de Datos. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts
    prefetch(elementosAprefetch: string[]): void {
        this.preFetchService.prefetchList(elementosAprefetch);
    }
}
