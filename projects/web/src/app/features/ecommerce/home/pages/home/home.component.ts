import { Component } from '@angular/core';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  featuredProducts : ProductInterface[] = [];
  dealProducts     : ProductInterface[] = [];

  constructor(
    private dataStorageService: DataStorageService,  // Inyectar una instancia del servicio en el componente
  ) {}

  ngOnInit(): void {

    // All Products - Separar en Fearured y Deal Products
    this.dataStorageService.getAllProducts().subscribe(

      // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
      (allProductsResponseData)  => {

        // console.log('allProductsResponseData get:');
        // console.log(allProductsResponseData);

        // Filtro los productos - Featured Products
        this.featuredProducts = allProductsResponseData.filter(

          // Cada producto
          ( product: ProductInterface ) => {

            // Criterio para mostrar o no cada producto
            return (product.featured == 1);

          }

        );
        
        // Filtro los productos - Deal Products
        this.dealProducts = allProductsResponseData.filter(

          // Cada producto
          ( product: ProductInterface ) => {

            // Criterio para mostrar o no cada producto
            return (product.deal == 1);

          }

        );

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
