import { Component } from '@angular/core';
import { ProductInterface } from 'projects/web/src/app/core/models/product.interface';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allProducts : ProductInterface[] = [];

  constructor(
    private dataStorageService: DataStorageService,  // Inyectar una instancia del servicio en el componente
  ) {}

  ngOnInit(): void {

    this.dataStorageService.getAllProducts().subscribe(

      // El primer parámetro es para recoger los datos que devuelve la llamada
      (responseData)  => {

        console.log('responseData get:');
        console.log(responseData);

        this.allProducts = responseData;

      },

      // El segundo parámetro es para recoger los errores del servidor
      (errorResponse) => {
        
        // CUIADADO: es importante ver este objeto, porque el contenido de errorResponse.error varía dependiendo del servidor que estemos usando.
        console.log('errorResponse get:');
        console.log(errorResponse);

      }
      
    );

  }

}
