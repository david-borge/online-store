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
  activeNavigationItem: string = '';
  lastActiveMainPage: string = '';

  // TODO:
  numberOfProductsInCart :number = 2;


  constructor(
    private router: Router,
    private preFetchService: PreFetchService,
    private routingService: RoutingService,
    private store: Store<fromApp.AppState>,
  ) {
    
    // Al cambiar de ruta, indicarlo en la Store Global
    this.routingService.SetFirstVisitedPage();

  }

  ngOnInit(): void {

    // - Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
    if( this.numberOfProductsInCart == 0 ) {
      this.navigationButtonRightText = "Explore the Store";
      this.navigationButtonRightURL  = "/home";
    }



    // - Leer de la Store la última página principal visitada
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {
      this.lastActiveMainPage = globalReducerData.lastActiveMainPage;
    } );



    // - Guardar en la Store el Navigation Item activo
    
    // Comprobacion
    // console.log('activeNavigationItem: ' + this.activeNavigationItem);

    // Si aterrizo en una de las páginas principales
    if( (this.router.url == '/home') || (this.router.url == '/categories') || (this.router.url == '/cart') || (this.router.url == '/account')) {

      // Comprobacion
      console.log('En una página principal: ' + this.router.url);

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: this.router.url, }) );
      this.store.dispatch( GlobalActions.SetLastActiveMainPage({ lastActiveMainPagePayload: this.router.url, }) );
  
    }

    // Si aterrizo en una página de categoría, activo /categories
    else if ( this.router.url.includes('/category/') ) {

      // Comprobacion
      console.log('En una página de categoría');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/categories', }) );

    }

    // Si aterrizo en una página de producto, activo /home
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '') && this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => { return (globalReducerData.activeNavigationItem == 'categories') }) ) {
      
      // Comprobacion
      console.log(' -> Si aterrizo en una página de producto, activo /home');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home', }) );

    }

    // Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la home, activo /home
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '/home') ) {
      
      // Comprobacion
      console.log('En una página de producto si la última página principal ha sido /home.');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home', }) );

    }

    // Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la categories, activo /categories
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '/categories') ) {
      
      // Comprobacion
      console.log('En una página de producto si la última página principal ha sido /categories.');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/categories', }) );

    }




    // - Leer de la Store la última página principal visitada
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {

      this.activeNavigationItem = globalReducerData.activeNavigationItem;

      // Comprobacion
      console.log('activeNavigationItem: ' + this.activeNavigationItem);

    } );

  }

  onCLickNavigationButtonRight() {
    this.router.navigate([ this.navigationButtonRightURL ]);
  }
  
  prefetch(elementosAprefetch: string[]): void {

    this.preFetchService.prefetchList( elementosAprefetch );

  }

}
