import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { FormControl, FormControlStatus, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../../../features/ecommerce/addresses/store/addresses.actions';

import { CountryInterface } from 'projects/web/src/app/core/models/country.interface';
import { ProcessStatusInterface } from 'projects/web/src/app/core/models/processStatus.interface';


@Component({
  selector: 'app-add-new-address-form',
  templateUrl: './add-new-address-form.component.html',
  styleUrls: ['./add-new-address-form.component.scss']
})
export class AddNewAddressFormComponent implements OnInit,OnDestroy {

  // Suscripciones a la Store
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Variables para la Template
  countries: CountryInterface[] = [];

  // Variables del formulario
  addNewAddressForm: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  @ViewChild('addNewAddressFormRef') addNewAddressFormViewChild: NgForm = {} as NgForm;
  addNewAddressResult: string = '';
  @ViewChild('addressLocalReference', {static: true}) addressLocalReferenceViewChild: ElementRef = {} as ElementRef;
  addNewAddressStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';
  @Output() isAddNewAddressFormValidEventEmitter = new EventEmitter<FormControlStatus>();

  
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    
    // Pone el foco en el campo address al carga el formulario
    this.addressLocalReferenceViewChild.nativeElement.focus();

    // - Leer la Addresses Store
    this.addressesReducerObservableSubscription = this.store.select("addressesReducerObservable").subscribe( addressesReducerData => {

      // Listado de Countries
      this.countries = addressesReducerData.countries;

      // addNewAddressStatus
      this.addNewAddressStatus = addressesReducerData.addNewAddressStatus;

      // Disable the form inputs if the add new address process is being done
      if ( this.addNewAddressStatus == 'STARTED' ) {
        this.addNewAddressForm.disable();
      }

    });

    // - Cargar la lista de Countries a la Store (si NO se ha cargado ya)
    this.store.dispatch( AddressesActions.GetAllCountriesStart({
      countries: this.countries,
    }) );

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
      'countryId'  : new FormControl(1,    [Validators.required]),  // Por defecto, selecciono la option con value="1" (el primer Country de la lista)
      'fullName'   : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
    });

    // - Status Observable: guardar los valores de los campos en la Addreses Store (si se ha rellenado el formulario completo y correctamente)
    this.addNewAddressForm.statusChanges.subscribe(
      (statusChanges) => {

        // Comprobación
        // console.log('statusChanges (VALID | INVALID | PENDING): ' + statusChanges);
        // console.log('newAddressCountryNamePayload: ' + this.countries.find(country => country.id === +this.addNewAddressForm.get('countryId')?.value)?.name ); // CUIDADO: hay que añadir el + delante de this.addNewAddressForm para convertir el string a número si uso el operador ===

        
        // Enviar el estado del formulario a BottomOverlayComponent para poder desactivar el botón "Add card" apropiadamente
        this.isAddNewAddressFormValidEventEmitter.emit( statusChanges );

        // Si el formulario es válido, guardar los valores de los campos en la Addreses Store
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
            newAddressCountryNamePayload: this.addNewAddressForm.get('countryId')?.value,
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
