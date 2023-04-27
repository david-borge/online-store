import { Component } from '@angular/core';

import { Store } from "@ngrx/store";

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  host: {
    class:'app-category-class-for-router-outlet',
  },
})
export class CategoryComponent {

  currentCategorySlug: string = '';
  currentCategory = {} as CategoryInterface;

  categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Leer datos desde la Store y mostrarlos
    // Slug de la categoría actual
    this.categoriesReducerObservableSubscription = this.store.select('categoriesReducerObservable')
      .subscribe(

        // El primer parámetro de susbscribe() es para recoger los datos que devuelve la llamada
        (categoriesReducerResponseData)  => {

          // console.log('categoriesReducerResponseData get:');
          // console.log(categoriesReducerResponseData);

          // Cojo el valor del slug de la categoría actual y lo guardo en la variable de este componente para poder mostrar el título y el color de fondo apropiados en el header
          this.currentCategorySlug = categoriesReducerResponseData.currentCategorySlug;

          // Filtro las categorías - Categoría con el slug actual
          this.currentCategory = categoriesReducerResponseData.allCategories.filter(

            // Cada categoría
            ( category: CategoryInterface ) => {

              // Criterio para mostrar o no cada categoría
              return (category.slug == this.currentCategorySlug);

            }

          )[0];  // Primer y único elemento del array, que es la categoría actual

          // Comprobacion
          // console.log('currentCategory:');
          // console.log(this.currentCategory);

          // Comprobacion
          // console.log('CategoryComponent > currentCategorySlug: ' + this.currentCategory.slug);
          // console.log('CategoryComponent > currentCategoryName: ' + this.currentCategory.name);
          // console.log('CategoryComponent > currentCategorycardAndHeaderBackgroundColor: ' + this.currentCategory.cardBackgroundColor);

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
    this.categoriesReducerObservableSubscription.unsubscribe();
  }

}
