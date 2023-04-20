import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as HomeActions from '../../store/home.actions';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredProducts : ProductInterface[] = [];
  dealProducts     : ProductInterface[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Cargar productos a la Store (recuperándolos de la Base de datos via HTTP Request)
    // FIXME: hacer esto SOLO si aún no hay ninguna categoría cargada en la store, porque si no, se harían llamadas HTTP innecesarias al pasar de una ruta a otra.
    this.store.dispatch( HomeActions.GetAllProductsStart() );

    // Leer datos desde la Store y mostrarlos
    // All Products - Separar en Fearured y Deal Products
    // FIXME: se pueden tomar los datos de la store sin una suscripción? Porque aquí solo necesito leerlos una vez.
    this.store.select('homeReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (allProductsResponseData)  => {

          // console.log('allProductsResponseData get:');
          // console.log(allProductsResponseData);

          // Filtro los productos - Featured Products
          this.featuredProducts = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.featured == 1);

            }

          );
          
          // Filtro los productos - Deal Products
          this.dealProducts = allProductsResponseData.allProducts.filter(

            // Cada producto
            ( product: ProductInterface ) => {

              // Criterio para mostrar o no cada producto
              return (product.deal == 1);

            }

          );

          // Comprobacion
          // console.log('featuredProducts:');
          // console.log(this.featuredProducts);

          // console.log('dealProducts:');
          // console.log(this.dealProducts);

        },

        // El segundo parámetro de susbscribe() es para recoger los errores del servidor
        (errorResponse) => {
          
          // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
          console.log('errorResponse get:');
          console.log(errorResponse);

        }
        
      );

  }

}
