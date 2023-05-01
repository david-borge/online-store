import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../core/store/global.actions';

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
  
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Leer la Global Store
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => {

      // Authentication - Comprobar en qué modo de autentificación estoy ('SIGNUP' | 'LOGIN')
      this.authMode = globalReducerData.authMode;

      this.showFirstAndLastNameFields = ( (this.authMode == 'SIGNUP') );

    });


    // Sign Up Form
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
    console.log('Form submitted!');

    // Comprobación
    console.log('signUpForm:');
    console.log(this.signUpForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

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

      // Comprobacion
      // console.log('Añadir los campos firstName y lastName del objeto JS signUpForm');

      this.signUpForm.addControl('firstName', new FormControl(null, Validators.required));
      this.signUpForm.addControl('lastName', new FormControl(null, Validators.required));

    }
    
    // Si estoy en Log In, quitar los campos firstName y lastName del objeto JS signUpForm
    else {

      // Comprobacion
      // console.log('Quitar los campos firstName y lastName del objeto JS signUpForm');

      this.signUpForm.removeControl('firstName');
      this.signUpForm.removeControl('lastName');

    }

    // Comprobación
    // console.log('signUpForm:');
    // console.log(this.signUpForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
