import { Component, ViewChild, ElementRef, AfterContentInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  host: {
    class:'app-loading-screen-classes-for-router-outlet'
  },
})
export class LoadingScreenComponent implements AfterContentInit {

  // Loading Screen - "Let's begin" button
  @ViewChild('letsBeginBtnLocalReference', {static: true}) letsBeginBtnLocalReferenceViewChild: ElementRef = {} as ElementRef;
  letsBeginBtnHTMLInputElement = {} as HTMLInputElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute,  // Ruta actual para la configuración de router.navigate(). Documentación: https://angular.io/api/router/ActivatedRoute
  ) { }

  ngAfterContentInit(): void {

    // Comprobacion
    console.log(this.letsBeginBtnHTMLInputElement);
  }

  onClickLetsBeginButton() {
    this.letsBeginBtnHTMLInputElement = this.letsBeginBtnLocalReferenceViewChild.nativeElement;  // Uso .nativeElement para pasar del ElementRef al elemento tipo HTML (HTMLInputElement), que es el que me interesa

    console.log(this.letsBeginBtnHTMLInputElement);
    
    // Ir a la Home Page
    // this.router.navigate(['/home']); // Ruta absoluta

  }

}
