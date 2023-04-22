import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PreFetchService } from '../../services/prefetch/prefetch.service';



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
    public router: Router,
    private preFetchService: PreFetchService,
  ) {}

  ngOnInit(): void {

    // Si el carrito está vacío, mostrar el botón "Explore the Store", que lleva a la Home Page
    if( this.numberOfProductsInCart == 0 ) {
      this.navigationButtonRightText = "Explore the Store";
      this.navigationButtonRightURL  = "/home";
    }

  }
  
  prefetch(elementosAprefetch: string[]): void {

    this.preFetchService.prefetchList( elementosAprefetch );

  }

}
