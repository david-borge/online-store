import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { ProductInterface } from '@core/models/product.interface';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as CategoriesActions from '@features/ecommerce/categories/store/categories.actions';

@Component({
    standalone: false,
    selector: 'app-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.scss'],
    host: {
        class: 'app-category-detail--class-for-router-outlet',
    },
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
    private store = inject<Store<fromApp.AppState>>(Store);
    private route = inject(ActivatedRoute);

    categorySlug = '';
    productsOfCurrentCategory: ProductInterface[] = [];

    homeReducerObservableSubscription: Subscription = Subscription.EMPTY;

    ngOnInit(): void {
        // Get current Category (from Route Paramenter :category-slug en projects\web\src\app\features\ecommerce\category\category-routing.module.ts)
        this.categorySlug = this.route.snapshot.params['category-slug'];

        // Comprobación
        // console.log('ProductDetailComponent > productSlug: ' + this.productSlug);

        // Guardar el categorySlug de la categoría actual en la Store para poder leerlo en CategoryComponent y mostrar el título y el color de fondo apropiados en el header
        this.store.dispatch(
            CategoriesActions.SaveCurrentCategorySlug({
                currentCategorySlugPayload: this.categorySlug,
            }),
        );

        // TODO: mover a su sitio apropiado: All Products - Filtrar para mostrar los de la categoría actual
        this.homeReducerObservableSubscription = this.store
            .select('homeReducerObservable')
            .subscribe(
                // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
                (allProductsResponseData) => {
                    // console.log('allProductsResponseData get:');
                    // console.log(allProductsResponseData);

                    // Filtro los productos - Products de la Category actual
                    this.productsOfCurrentCategory = allProductsResponseData.allProducts.filter(
                        // Cada producto
                        (product: ProductInterface) => {
                            // Criterio para mostrar o no cada producto
                            return product.category == this.categorySlug;
                        },
                    );

                    // Comprobacion
                    // console.log('productsOfCurrentCategory:');
                    // console.log(this.productsOfCurrentCategory);
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
