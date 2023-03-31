import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  host: {
    class:'app-loading-screen-classes-for-router-outlet'
  },
})
export class LoadingScreenComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,  // Ruta actual para la configuración de router.navigate(). Documentación: https://angular.io/api/router/ActivatedRoute
  ) { }

  onClickLetsBeginButton() {
    
    // Ir a la Home Page
    this.router.navigate(['/home']); // Ruta absoluta

  }

}
