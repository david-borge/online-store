import { Component, OnInit } from '@angular/core';

import { AuthService } from 'projects/web/src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';


  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    // - Authentication - Comprobar si el usuario está logueado (leer las cookies "authToken" y "authExpirationDate", guardar sus valores en la Global Store y ajustar el valor de loggedIn de la Global Store acordemente)
    this.authService.checkIfUserIsLoggedIn();
    
  }

}
