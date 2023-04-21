import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx

import * as HomeActions from '../../../features/ecommerce/home/store/home.actions';
import * as CategoriesActions from '../../../features/ecommerce/categories/store/categories.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

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

  // TODO:
  numberOfProductsInCart :number = 2;

  constructor(
    private store: Store<fromApp.AppState>,
    public router: Router,
  ) {}

  ngOnInit(): void {

    // Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
    if( this.numberOfProductsInCart == 0 ) {
      this.navigationButtonRightText = "Explore the Store";
      this.navigationButtonRightURL  = "/home";
    }

  }
  
  prefetch(elementoAprefetch: string) {

    // Hago el pre-fetch de lo que necesite en cada caso
    switch ( elementoAprefetch ) {

      case 'home':
        // Cargar productos a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( HomeActions.GetAllProductsStart() );
        break;

      case 'categories':
        // Cargar categorias a la Store (recuperándolos de la Base de datos via HTTP Request)
        this.store.dispatch( CategoriesActions.GetAllCategoriesStart() );
        break;
      
      default:
        break;
    }

  }

}
