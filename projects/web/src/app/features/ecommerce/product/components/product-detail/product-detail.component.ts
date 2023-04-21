import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-description-content *)
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productSlug: string = '';
  product = {} as ProductInterface;

  homeReducerObservableSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    // Get current Product (from Route Paramenter :product-slug en projects\web\src\app\features\ecommerce\product\product-routing.module.ts)
    this.productSlug = this.route.snapshot.params['product-slug'];

    // IMPORTANTE: al llegar aquí, los productos ya están cargados en la Store porque los he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlos solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\pre-fetch\pre-fetch.service.ts

    // TODO: mover a NgRx
    this.homeReducerObservableSubscription = this.store.select('homeReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (allProductsResponseData)  => {

          // console.log('allProductsResponseData get:');
          // console.log(allProductsResponseData);

          // Filtro los productos - Producto con el slug apropiado
          this.product = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.slug == this.productSlug);

            }

          )[0];  // Primer y único elemento del array, que es el producto actual

          // console.log('product:');
          // console.log(this.product);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse get:');
          console.log(errorResponse);

        }
        
      );

  }

  ngOnDestroy(): void {
    this.homeReducerObservableSubscription.unsubscribe();
  }

}
