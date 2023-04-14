import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AnimationEvent, trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  host: {
    class:'app-loading-screen-classes-for-router-outlet'
  },
  animations: [

    // Loading Screen - "Let's begin" button
    trigger('animacionLetsBeginButton', [
      
      transition('* => *', [
        style({ opacity: '0' }),
        animate('300ms 2100ms cubic-bezier(0.4, 0, 0.4, 1)'),  // animation-duration animation-delay animation-timing-function
      ]),

    ]),
    
  ],
})
export class LoadingScreenComponent {

  // Loading Screen - "Let's begin" button - Animation
  letsBeginButtonIsDisabled: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,  // Ruta actual para la configuración de router.navigate(). Documentación: https://angular.io/api/router/ActivatedRoute
  ) { }

  // Loading Screen - "Let's begin" button - Animation Start
  animacionLetsBeginButtonStarted(event: AnimationEvent) {
    // Comprobacion
    // console.log('animacionLetsBeginButtonStarted - event:');
    // console.log(event);
  }

  // Loading Screen - "Let's begin" button - Animation End - Activar el botón cuando la animación termina (para que no se pueda hacer click mientras es invisible)
  animacionLetsBeginButtonEnded(event: AnimationEvent) {
    this.letsBeginButtonIsDisabled = false;

    // Comprobacion
    // console.log('animacionLetsBeginButtonEnded - event');
    // console.log(event);
  }

  // Loading Screen - "Let's begin" button - onClick - Navigate to Home Page
  onClickLetsBeginButton() {
    
    // Ir a la Home Page
    this.router.navigate(['/home']); // Ruta absoluta

  }

}
