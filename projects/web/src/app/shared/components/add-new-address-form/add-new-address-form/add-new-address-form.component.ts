import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '../../../../core/store/global.actions';

import { AuthService } from '../../../../core/services/auth/auth.service';


@Component({
  selector: 'app-add-new-address-form',
  templateUrl: './add-new-address-form.component.html',
  styleUrls: ['./add-new-address-form.component.scss']
})
export class AddNewAddressFormComponent {

  // Suscripciones a la Store
  globalReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  authMode: 'SIGNUP' | 'LOGIN' = 'SIGNUP';

  // Variables del formulario
  addNewAddress: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  addNewAddressResult: string = '';
  
  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    // - Leer la Global Store
    this.globalReducerObservableSubscription = this.store.select("globalReducerObservable").subscribe( globalReducerData => {

      // this.addNewAddressResult = this.authService.authMessages(globalReducerData.addNewAddressResult);

    });


    // - Sign Up Form
    this.addNewAddress = new FormGroup({
      // Controles: 'name_del_control': new FormControl(valor_inicial, validadores_normales, validadores_asincronos)
      // Validadores de Angular (Reactive approach): usar estos métodos en el TS: https://angular.io/api/forms/Validators
      /* Comprobación de validadores:
          - Clases ng-valid y ng-invalid en el control
          - Objeto JS del form: addNewAddress.controls.name_o_ruta_del_control.errors. En addNewAddress.errors no aparece.
      */
      'address': new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
      'postalCode' : new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
      'email'    : new FormControl(null, [Validators.required, Validators.email]/* , [this.forbiddenEmailsAsyncronusValidator.bind(this)] */),  // null si quiero que el campo esté vacío inicialmente
      'fullName' : new FormControl(null, [Validators.required/* , this.forbiddenNamesValidator.bind(this) */]),  // null si quiero que el campo esté vacío inicialmente
    });

  }

  onSubmit() {
    
    // Comprobación
    // console.log('addNewAddress:');
    // console.log(this.addNewAddress);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    

    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.addNewAddress.reset();

  }

  ngOnDestroy(): void {
    this.globalReducerObservableSubscription.unsubscribe();
  }

}
