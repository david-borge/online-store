import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: {
    class:'app-categories-classes-for-router-outlet'
  },
})
export class CategoriesComponent {

  allCategories : CategoryInterface[] = [];

  constructor(
    public router: Router,
    private dataStorageService: DataStorageService,  // Inyectar una instancia del servicio en el componente
  ) {}

  ngOnInit(): void {

    this.dataStorageService.getAllCategories().subscribe(

      // El primer parámetro es para recoger los datos que devuelve la llamada
      (responseData)  => {

        console.log('responseData get:');
        console.log(responseData);

        this.allCategories = responseData;

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
