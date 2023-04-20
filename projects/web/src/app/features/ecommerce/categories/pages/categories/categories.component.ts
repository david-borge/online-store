import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as CategoriesActions from '../../store/categories.actions';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: {
    class:'app-categories-classes-for-router-outlet'
  },
})
export class CategoriesComponent implements OnInit {

  allCategories : CategoryInterface[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Cargar categorias a la Store (recuperándolos de la Base de datos via HTTP Request)
    // FIXME: hacer esto SOLO si aún no hay ninguna categoría cargada en la store, porque si no, se harían llamadas HTTP innecesarias al pasar de una ruta a otra.
    this.store.dispatch( CategoriesActions.GetAllCategoriesStart() );

    // Leer datos desde la Store y mostrarlos
    // All Categories - Separar en Fearured y Deal Categories
    // FIXME: se pueden tomar los datos de la store sin una suscripción? Porque aquí solo necesito leerlos una vez.
    this.store.select('categoriesReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (allCategoriesResponseData)  => {

          // console.log('allCategoriesResponseData get:');
          // console.log(allCategoriesResponseData);

          this.allCategories = allCategoriesResponseData.allCategories;

          // Comprobacion
          // console.log('allCategories:');
          // console.log(this.allCategories);

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
