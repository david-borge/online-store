import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import * as fromApp from '../../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as HomeActions from '../../../home/store/home.actions';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';
import { GetCurrentProductReviewsPHPInterface } from 'projects/web/src/app/core/models/getCurrentProductReviewsPHP.interface';
import { ReviewInterface } from 'projects/web/src/app/core/models/review.interface';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    encapsulation: ViewEncapsulation.None, // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-description-content *)
})
export class ProductDetailComponent implements OnInit {
    // Suscripciones a la Store
    homeReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    productSlug: string = '';
    @Input() product = {} as ProductInterface;
    featuredProducts: ProductInterface[] = [];
    currentProductReviews: GetCurrentProductReviewsPHPInterface[] = [];
    currentProductRatingNumber: ReviewInterface['ratingNumber'] = 0;

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        // Get current Product (from Route Paramenter :product-slug en projects\web\src\app\features\ecommerce\product\product-routing.module.ts)
        this.productSlug = this.route.snapshot.params['product-slug'];

        // Comprobación
        // console.log('ProductDetailComponent > productSlug: ' + this.productSlug);

        // Guardar el productSlug del producto actual en la Store para poder leerlo en ProductComponent y mostrar el título y el color de fondo apropiados en el header
        this.store.dispatch(
            HomeActions.SaveCurrentProductSlug({ currentProductSlugPayload: this.productSlug }),
        );

        // Guardar currentProductReviews en la Home Store
        this.store.dispatch(
            HomeActions.GetCurrentProductReviewsStart({
                currentProductSlugPayload: this.productSlug,
            }),
        );

        // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts
        // Leer datos desde la Store y mostrarlos
        // All Products - Filtrando para mostrar solo el producto con el slug correspondiente
        // currentProductReviews
        this.homeReducerObservableSubscription = this.store
            .select('homeReducerObservable')
            .subscribe(
                // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
                (homeReducerData) => {
                    // console.log('homeReducerData get:');
                    // console.log(homeReducerData);

                    // - Compruebo si hay algún producto antes de filtrar
                    if (homeReducerData.allProducts.length > 0) {
                        // - Filtro los productos - Producto con el slug apropiado
                        this.product = homeReducerData.allProducts.filter(
                            // Cada producto
                            (product: ProductInterface) => {
                                // Criterio para mostrar o no cada producto
                                return product.slug == this.productSlug;
                            },
                        )[0]; // Primer y único elemento del array, que es el producto actual

                        // console.log('product:');
                        // console.log(this.product);

                        // - Filtro los productos - Featured Products
                        this.featuredProducts = homeReducerData.allProducts.filter(
                            // Cada producto
                            (product: ProductInterface) => {
                                // Criterio para mostrar o no cada producto
                                return product.featured == 1;
                            },
                        );
                    }

                    // - currentProductReviews
                    this.currentProductReviews = homeReducerData.currentProductReviews;

                    // - currentProductRatingNumber
                    this.currentProductRatingNumber = 0;
                    this.currentProductReviews.map((currentProductReview) => {
                        this.currentProductRatingNumber += currentProductReview.starsWidth;
                    });
                    this.currentProductRatingNumber =
                        ((this.currentProductRatingNumber / this.currentProductReviews.length) *
                            5) /
                        100; // Pasar de porcentaje a puntuación sobre 5
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
        this.homeReducerObservableSubscription.unsubscribe();
    }
}
