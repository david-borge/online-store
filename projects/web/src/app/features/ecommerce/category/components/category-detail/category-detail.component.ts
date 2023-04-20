import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  host: {
    class:'app-category-detail-classes-for-router-outlet'
  },
})
export class CategoryDetailComponent {

  currentCategory: string = '';
  productsOfCurrentCategory : ProductInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,  // Inyectar una instancia del servicio en el componente
  ) {}

  ngOnInit(): void {

    // Get current Category (from Route Paramenter :category-slug en projects\web\src\app\features\ecommerce\category\category-routing.module.ts)
    this.currentCategory = this.route.snapshot.params['category-slug'];

    // TODO: Mandar la categoría actual a CategoryComponent para mostrarlo en la header

    // TODO: mover a su sitio apropiado: All Products - Filtrar para mostrar los de la categoría actual
    this.dataStorageService.getAllProductsHttpRequest().subscribe(

      // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
      (allProductsResponseData)  => {

        // console.log('allProductsResponseData get:');
        // console.log(allProductsResponseData);

        // Filtro los productos - Products de la Category actual
        this.productsOfCurrentCategory = allProductsResponseData.filter(

          // Cada producto
          ( product: ProductInterface ) => {

            // Criterio para mostrar o no cada producto
            return (product.category == this.currentCategory);

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
