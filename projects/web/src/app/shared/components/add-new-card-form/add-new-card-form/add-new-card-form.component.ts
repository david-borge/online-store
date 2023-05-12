import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../../features/ecommerce/addresses/store/addresses.actions';

import { CountryInterface } from 'projects/web/src/app/core/models/country.interface';

@Component({
  selector: 'app-add-new-card-form',
  templateUrl: './add-new-card-form.component.html',
  styleUrls: ['./add-new-card-form.component.scss']
})
export class AddNewCardFormComponent {

  // Suscripciones a la Store
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  currentYear: number = new Date().getFullYear();

  // Variables del formulario
  addNewAddressForm: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  @ViewChild('addNewAddressFormRef') addNewAddressFormViewChild: NgForm = {} as NgForm;
  addNewCardResult: string = '';
  
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // - Cargar la lista de Countries a la Store
    this.store.dispatch( AddressesActions.GetAllCountriesStart() );

    // - Add New Card Form
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
      'fullName'   : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'cardExpirationMonth'  : new FormControl(1, [Validators.required]),  // Por defecto, selecciono el primer mes (enero)
      'cardExpirationYear'  : new FormControl(this.currentYear, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
    });

    // - Status Observable: guardar los valores de los campos en la Addreses Store (si se ha rellenado el formulario completo y correctamente)
    this.addNewAddressForm.statusChanges.subscribe(
      (statusChanges) => {

        // Comprobación
        // console.log('statusChanges (VALID | INVALID | PENDING): ' + statusChanges);

        if ( statusChanges === 'VALID') {
          
          // Comprobación
          // console.log('Valores del formulario: ' + this.addNewAddressForm.get('address')?.value + ' - ' + this.addNewAddressForm.get('postalCode')?.value + ' - ' + this.addNewAddressForm.get('city')?.value + ' - ' + this.addNewAddressForm.get('countryId')?.value + ' - ' + this.addNewAddressForm.get('fullName')?.value);
          
          // Guardar los valores de los campos en la Addresses Store
          this.store.dispatch( AddressesActions.SaveNewAddressToStore({
            newAddressPayload: {
              fullName   : this.addNewAddressForm.get('fullName')?.value,
              address    : this.addNewAddressForm.get('address')?.value,
              postalCode : this.addNewAddressForm.get('postalCode')?.value,
              city       : this.addNewAddressForm.get('city')?.value,
              countryId  : this.addNewAddressForm.get('countryId')?.value,
            },
          }) );

        }

      }
    );

  }

  /* onSubmit() {

    // Comprobación
    console.log('addNewAddressForm:');
    console.log(this.addNewAddressForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.addNewAddressForm.reset();

  } */

  ngOnDestroy(): void {
    this.addressesReducerObservableSubscription.unsubscribe();
  }

}
