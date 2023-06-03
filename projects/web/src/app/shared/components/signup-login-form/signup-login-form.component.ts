import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../core/store/global.actions';

import { AuthService } from '../../../core/services/auth/auth.service';
import { CookiesService } from '../../../core/services/cookies/cookies.service';

import { ProcessStatusInterface } from '../../../core/models/processStatus.interface';

@Component({
  selector: 'app-signup-login-form',
  templateUrl: './signup-login-form.component.html',
  styleUrls: ['./signup-login-form.component.scss']
})
export class SignupLoginFormComponent implements OnInit, OnDestroy {

  // Suscripciones a la Store
  globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  authMode: 'SIGNUP' | 'LOGIN' = 'SIGNUP';

  // Variables del formulario
  signUpForm: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  showFirstAndLastNameFields: boolean = ( (this.authMode == 'SIGNUP') );
  signUpLogInButtonText: string = '';
  signUpLogInResult: string = '';
  signUpLogInStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';
  
  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private cookiesService: CookiesService,
  ) {}

  ngOnInit(): void {

    // - Leer la Global Store
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => {

      // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
      this.authMode = globalReducerData.authMode;

      this.showFirstAndLastNameFields = ( (this.authMode == 'SIGNUP') );

      // - signUpLogInStatus
      this.signUpLogInStatus = globalReducerData.signUpLogInStatus;

      // signUpLogInButtonText
      if ( this.signUpLogInStatus != 'STARTED' ) {

        if ( this.authMode == 'SIGNUP' ) {
          this.signUpLogInButtonText = 'Sign Up';
        } else {
          this.signUpLogInButtonText = 'Log In';
        }
        
      } else {

        if ( this.authMode == 'SIGNUP' ) {
          this.signUpLogInButtonText = 'Signing up...';
        } else {
          this.signUpLogInButtonText = 'Logging in...';
        }

      }

      // Disable the form inputs if the signing up or logging in process is being done
      if ( this.signUpLogInStatus == 'STARTED' ) {
        this.signUpForm.disable();
      }
      

      this.signUpLogInResult = this.authService.authMessages(globalReducerData.signUpLogInResult);

    });


    // - Sign Up Form
    this.signUpForm = new FormGroup({
      // Controles: 'name_del_control': new FormControl(valor_inicial, validadores_normales, validadores_asincronos)
      // Validadores de Angular (Reactive approach): usar estos métodos en el TS: https://angular.io/api/forms/Validators
      /* Comprobación de validadores:
          - Clases ng-valid y ng-invalid en el control
          - Objeto JS del form: signUpForm.controls.name_o_ruta_del_control.errors. En signUpForm.errors no aparece.
      */
      'firstName': new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
      'lastName' : new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
      'email'    : new FormControl(null, [Validators.required, Validators.email]/* , [this.forbiddenEmailsAsyncronusValidator.bind(this)] */),  // null si quiero que el campo esté vacío inicialmente
      'password' : new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
    });

  }

  onSubmit() {
    
    // Comprobación
    // console.log('Form submitted! - authMode: ' + this.authMode);

    // Comprobación
    // console.log('signUpForm:');
    // console.log(this.signUpForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    // Sign Up
    if ( this.authMode == 'SIGNUP' ) {

      // Generar un token de autentificación aleatorio SI es que no existe uno (que puede pasar si el usuario ha añadido productos al carrito sin iniciar sesión o registrarse)
      let authToken = this.cookiesService.leerUnaCookie('authToken');
      if ( authToken == '' ) {
        authToken = this.authService.generateToken();
      }
      
      this.authService.signUp(
        this.signUpForm.get('firstName')?.value, // ? por si es NULL (aunque no lo será)
        this.signUpForm.get('lastName')?.value, // ? por si es NULL (aunque no lo será)
        this.signUpForm.get('email')?.value, // ? por si es NULL (aunque no lo será)
        this.signUpForm.get('password')?.value, // ? por si es NULL (aunque no lo será)
        new Date().toString(), // signUpFullDate (ahora)
        new Date().toString(), // lastLoginFullDate (ahora)
        authToken, // Token de autentificación
      );

    }
    
    // Log In
    else {
      
      this.authService.logIn(
        this.signUpForm.get('email')?.value, // ? por si es NULL (aunque no lo será)
        this.signUpForm.get('password')?.value, // ? por si es NULL (aunque no lo será)
        new Date().toString(), // lastLoginFullDate (ahora)
        this.authService.generateToken(),
      );

    }

    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.signUpForm.reset();

  }

  onClickGoToLogInOrSignUp() {

    // - Change Auth Mode ('SIGNUP' | 'LOGIN')
    this.store.dispatch( GlobalActions.ChangeAuthMode() );

    // - Añadir o quitar los campos firstName y lastName del objeto JS signUpForm
    
    // Si estoy en Sign Up, añadir los campos firstName y lastName del objeto JS signUpForm
    if ( this.authMode == 'SIGNUP' ) {

      // Comprobación
      // console.log('Añadir los campos firstName y lastName del objeto JS signUpForm');

      this.signUpForm.addControl('firstName', new FormControl(null, Validators.required));
      this.signUpForm.addControl('lastName', new FormControl(null, Validators.required));

    }
    
    // Si estoy en Log In, quitar los campos firstName y lastName del objeto JS signUpForm
    else {

      // Comprobación
      // console.log('Quitar los campos firstName y lastName del objeto JS signUpForm');

      this.signUpForm.removeControl('firstName');
      this.signUpForm.removeControl('lastName');

    }

    // Comprobación
    // console.log('signUpForm:');
    // console.log(this.signUpForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    // - Borrar el mensaje de error
    this.store.dispatch( GlobalActions.EmptySignUpLogInResult() );

  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
