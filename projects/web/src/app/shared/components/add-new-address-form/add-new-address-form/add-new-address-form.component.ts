import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../../features/ecommerce/addresses/store/addresses.actions';

import { CountryInterface } from 'projects/web/src/app/core/models/country.interface';


@Component({
  selector: 'app-add-new-address-form',
  templateUrl: './add-new-address-form.component.html',
  styleUrls: ['./add-new-address-form.component.scss']
})
export class AddNewAddressFormComponent {

  // Suscripciones a la Store
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  countries: CountryInterface[] = [];

  // Variables del formulario
  addNewAddressForm: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  addNewAddressResult: string = '';
  @ViewChild('addNewAddressFormRef') addNewAddressFormViewChild: NgForm = {} as NgForm;
  
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Cargar la lista de Countries a la Store
    this.store.dispatch( AddressesActions.GetAllCountriesStart() );

    // - Leer la Addresses Store
    this.addressesReducerObservableSubscription = this.store.select("addressesReducerObservable").subscribe( addressesReducerData => {

      // Listado de Countries
      this.countries = addressesReducerData.countries;

    });

    // - Add New Address Form
    this.addNewAddressForm = new FormGroup({
      // Controles: 'name_del_control': new FormControl(valor_inicial, validadores_normales, validadores_asincronos)
      // Validadores de Angular (Reactive approach): usar estos métodos en el TS: https://angular.io/api/forms/Validators
      /* Comprobación de validadores:
          - Clases ng-valid y ng-invalid en el control
          - Objeto JS del form: addNewAddressForm.controls.name_o_ruta_del_control.errors. En addNewAddressForm.errors no aparece.
      */
      'address'    : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'postalCode' : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'city'       : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'country'    : new FormControl(1,    [Validators.required]),  // Por defecto, selecciono la option con value="1" (el primer Country de la lista)
      'fullName'   : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
    });

  }

  onSubmit() {

    // Comprobación
    console.log('Form submitted!');
    console.log('addNewAddressFormViewChild:');
    console.log(this.addNewAddressFormViewChild);
    
    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.addNewAddressForm.reset();

  }

  ngOnDestroy(): void {
    this.addressesReducerObservableSubscription.unsubscribe();
  }

}
