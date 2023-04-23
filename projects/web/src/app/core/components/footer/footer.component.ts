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
  activeNavigationItem: string | null = '';
  lastActiveMainPage: string | null = '';

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



    // - Leer de la Store la última página principal visitada (lastActiveMainPage)
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {
      this.lastActiveMainPage = globalReducerData.lastActiveMainPage;
    } );

    // Leer de Local Storage la última página principal visitada (lastActiveMainPage) y guardarlo en la Store
    // this.store.dispatch( GlobalActions.GetLocalStorageValueStart({ localStorageKeyPayload: 'lastActiveMainPage', }));

    



    // - Guardar en la Store el Navigation Item activo
    
    // Comprobacion
    console.log('activeNavigationItem: ' + this.activeNavigationItem + ' - lastActiveMainPage: ' + this.lastActiveMainPage);

    // · Si aterrizo en una de las páginas principales
    if( (this.router.url == '/home') || (this.router.url == '/categories') || (this.router.url == '/cart') || (this.router.url == '/account')) {

      // Comprobacion
      // console.log('En una página principal: ' + this.router.url);

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: this.router.url, }) );
      this.store.dispatch( GlobalActions.SetLocalStorageKeyValue({
        localStorageKeyPayload: 'lastActiveMainPage',
        localStorageValuePayload: this.router.url,
      }) );
      
      this.store.dispatch( GlobalActions.GetLocalStorageValueStart({
        localStorageKeyPayload: 'lastActiveMainPage',
      }) );
  
    }

    // · Si aterrizo en una página de categoría, activo /categories
    else if ( this.router.url.includes('/category/') ) {

      // Comprobacion
      // console.log('En una página de categoría');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/categories', }) );

    }

    // · Si estoy en una página de producto habiendo llegado desde la home o desde categorías y recargo la página, debería marcarse la página de home o categorías, según lo que ponga en Local Storage en lastActiveMainPage.
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '') ) {

      // Comprobacion
      console.log('Si estoy en una página de producto habiendo llegado desde la home o desde categorías y recargo la página, debería marcarse la página de home o categorías, según lo que ponga en Local Storage en lastActiveMainPage.');
      
      this.store.dispatch( GlobalActions.GetLocalStorageValueStart({
        localStorageKeyPayload: 'lastActiveMainPage',
      }) );

      this.store.select('globalReducerObservable').pipe(take(1))
        .subscribe( (data) => {
          // Comprobacion
          console.log('data.lastActiveMainPage: ' + data.lastActiveMainPage);
          
          if ( data.lastActiveMainPage != null ) {
            this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: data.lastActiveMainPage, }) );
          } else {
            // Por defecto (cuando llego a la página por primera vez desde el Modo Incógnito), muestro la home
            this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home', }) );
          }

        } );

    }

    // · Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la home, activo /home
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '/home') ) {
      
      // Comprobacion
      // console.log('En una página de producto si la última página principal ha sido /home.');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home', }) );

    }

    // · Si llego a una página de producto habiendo estado antes en otra página y siendo la última página principal activa la categories, activo /categories
    else if ( this.router.url.includes('/product/') && (this.lastActiveMainPage == '/categories') ) {
      
      // Comprobacion
      // console.log('En una página de producto si la última página principal ha sido /categories.');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/categories', }) );

    }

    // Por defecto (cuando llego a la página por primera vez desde el Modo Incógnito), muestro la home
    else {
      
      // Comprobacion
      // console.log('Por defecto');

      this.store.dispatch( GlobalActions.SetActiveNavigationItem({ activeNavigationItemPayload: '/home', }) );

    }





    // - Leer de la Store la última página principal visitada
    this.store.select('globalReducerObservable').pipe(take(1)).subscribe( (globalReducerData) => {

      this.activeNavigationItem = globalReducerData.activeNavigationItem;

      // Comprobacion
      // console.log('activeNavigationItem: ' + this.activeNavigationItem);

    } );



    // Borrar
    // Comprobacion
    // console.log(this.lastActiveMainPage);

  }

  onCLickNavigationButtonRight() {
    this.router.navigate([ this.navigationButtonRightURL ]);
  }
  
  prefetch(elementosAprefetch: string[]): void {

    this.preFetchService.prefetchList( elementosAprefetch );

  }

}
