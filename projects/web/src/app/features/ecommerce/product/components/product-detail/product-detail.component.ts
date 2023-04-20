import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,  // Para que el CSS se aplique correctamente a los elementos del DOM que son generados dinámicamente (.product-description-content *)
})
export class ProductDetailComponent {

  currentProductSlug: string = '';
  currentProduct = {} as ProductInterface;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,  // Inyectar una instancia del servicio en el componente
  ) {}

  ngOnInit(): void {

    // Get current Product (from Route Paramenter :product-slug en projects\web\src\app\features\ecommerce\product\product-routing.module.ts)
    this.currentProductSlug = this.route.snapshot.params['product-slug'];

    // TODO: mover a su sitio apropiado: All Products - Filtrar para mostrar los de la categoría actual
    this.dataStorageService.getAllProductsHttpRequest().subscribe(

      // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
      (allProductsResponseData)  => {

        // console.log('allProductsResponseData get:');
        // console.log(allProductsResponseData);

        // Filtro los productos - Products de la Category actual
        this.currentProduct = allProductsResponseData.filter(

          // Cada producto
          ( product: ProductInterface ) => {

            // Criterio para mostrar o no cada producto
            return (product.slug == this.currentProductSlug);

          }

        )[0];  // Primer y único elemento del array, que es el producto actual

        // console.log('currentProduct:');
        // console.log(this.currentProduct);

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
