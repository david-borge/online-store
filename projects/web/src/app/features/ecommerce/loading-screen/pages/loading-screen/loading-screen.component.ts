import { Component } from '@angular/core';

import { Router } from '@angular/router';

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
  // Hago la animación como una Angular Animation en lugar de como una CSS Animation para poder desactivar el botón hasta que esté visible.
  letsBeginButtonIsDisabled: boolean = true;

  constructor(
    private router: Router,
  ) { }

  // Loading Screen - "Let's begin" button - Animation End - Activar el botón cuando la animación termina (para que no se pueda hacer click mientras es invisible)
  // No me hace falta recibir el evento
  animacionLetsBeginButtonEnded() {
    this.letsBeginButtonIsDisabled = false;
  }

  // Loading Screen - "Let's begin" button - onClick - Navigate to Home Page
  onClickLetsBeginButton() {
    
    // Ir a la Home Page
    this.router.navigate(['/home']); // Ruta absoluta

  }

}
