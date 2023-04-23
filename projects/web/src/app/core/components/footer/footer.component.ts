import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../store/global.actions';

import { PreFetchService } from '../../services/prefetch/prefetch.service';
import { RoutingService } from '../../services/routing/routing.service';
import { take } from 'rxjs';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Propiedades - Footer - Navigation CTAs & Copy
  @Input() navigationShowCtasAndCopy :boolean = false;
  
  // Propiedades - Footer - Navigation CTAs & Copy - Navigation Copy
  @Input() navigationShowCopy  :boolean = true;
  @Input() navigationCopyLabel :string  = '';
  @Input() navigationCopyPrice :string  = '';
  
  // Propiedades - Footer - Navigation CTAs & Copy - Navigation Button Right
  @Input() navigationButtonRightText              :string  = '';
  @Input() navigationButtonRightURL               :string  = '/checkout';
  @Input() navigationButtonRightClasses           :string  = 'btn-primary btn-lg';
  @Input() navigationShowButtonRightRightIcon     :boolean = false;
  @Input() navigationShowButtonRightRightIconType :string = 'check';

  // Propiedades - Footer - Navigation CTAs & Copy - Navigation Item
  lastActiveMainPage: string = '';

  // TODO:
  numberOfProductsInCart :number = 2;

  constructor(
    private router: Router,
    private preFetchService: PreFetchService,
    private routingService: RoutingService,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // - Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
    if( this.numberOfProductsInCart == 0 ) {
      this.navigationButtonRightText = "Explore the Store";
      this.navigationButtonRightURL  = "/home";
    }



    // - Guardar en la Store la última página principal visitada
    
    // Si aterrizo en una de las páginas principales
    if( (this.router.url == '/home') || (this.router.url == '/categories') || (this.router.url == '/cart') || (this.router.url == '/account')) {

      // Comprobacion
      // console.log('Slug actual: ' + this.router.url);

      this.store.dispatch( GlobalActions.SetLastActiveMainPage({ lastActiveMainPagePayload: this.router.url, }) );
  
    }

    // Si aterrizo en una página de categoría, activo /categories
    else if ( this.router.url.includes('/category/') ) {

      // Comprobacion
      // console.log('En una página de categoría');

      this.store.dispatch( GlobalActions.SetLastActiveMainPage({ lastActiveMainPagePayload: '/categories', }) );

    }

    // Si aterrizo en una página de producto, activo /home
    else if ( this.router.url.includes('/product/') ) {
      
      // Comprobacion
      // console.log('En una página de producto');

      this.store.dispatch( GlobalActions.SetLastActiveMainPage({ lastActiveMainPagePayload: '/home', }) );

    }



    // - Leer de la Store la última página principal visitada
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {

      this.lastActiveMainPage = globalReducerData.lastActiveMainPage;

    } );

    // Comprobacion
    console.log('lastActiveMainPage: ' + this.lastActiveMainPage);

  }

  onCLickNavigationButtonRight() {
    this.router.navigate([ this.navigationButtonRightURL ]);
  }
  
  prefetch(elementosAprefetch: string[]): void {

    this.preFetchService.prefetchList( elementosAprefetch );

  }

}
