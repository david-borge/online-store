import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription, take } from 'rxjs';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../../../core/store/global.actions';

import { RoutingService } from 'projects/web/src/app/core/services/routing/routing.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: {
    class:'app-categories-classes-for-router-outlet'
  },
})
export class CategoriesComponent implements OnInit, OnDestroy {

  allCategories : CategoryInterface[] = [];

  categoriesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // TODO: Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
  currentlyInThePageIEnteredFrom: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private routingService: RoutingService,
  ) {
    
    // Al cambiar de ruta, indicarlo en la Store Global
    this.routingService.setHaveNavigatedToTrue();

  }


  ngOnInit(): void {

    // IMPORTANTE: al llegar aquí, las categorias ya están cargadas en la Store porque las he cargado (recuperadas de la Base de datos via HTTP Request) lo antes posible con pre-fetch, así que para mostrarlas solo tengo que leer la Store. Ver projects\web\src\app\shared\directives\prefetch.directive.ts, projects\web\src\app\core\components\footer\footer.component.ts, projects\web\src\app\core\components\footer\footer.component.html y projects\web\src\app\core\services\prefetch\prefetch.service.ts

    // Leer datos desde la Store y mostrarlos
    // All Categories
    this.categoriesReducerObservableSubscription = this.store.select('categoriesReducerObservable')
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


      
    // Hacer que la animación de carga se ejecute solo si acabo de recargar la página. Por ejemplo, no ejecutar la animación si he entrado por /categories y luego he navegado a /home
    this.currentlyInThePageIEnteredFrom = ( (document.referrer.substring(document.referrer.lastIndexOf('/'))) == this.router.url );

    // Comprobación
    console.log('Slug de la página de entrada: ' + document.referrer.substring(document.referrer.lastIndexOf('/')));
    console.log('Slug actual: ' + this.router.url);
    console.log('currentlyInThePageIEnteredFrom: ' + this.currentlyInThePageIEnteredFrom);

  }

  ngOnDestroy() {
    this.categoriesReducerObservableSubscription.unsubscribe();
  }

}
