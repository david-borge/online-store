import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromApp from '../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as PaymentMethodsActions from '../../../../features/ecommerce/payment-methods/store/payment-methods.actions';


@Component({
  selector: 'app-add-new-card-form',
  templateUrl: './add-new-card-form.component.html',
  styleUrls: ['./add-new-card-form.component.scss']
})
export class AddNewCardFormComponent implements OnInit {

  // Variables para la Template
  currentYear: number = new Date().getFullYear();

  // Variables del formulario
  addNewCardForm: FormGroup = new FormGroup({});  // Objecto JS que contiene el formulario creado programáticamente
  @ViewChild('addNewCardFormRef') addNewCardFormViewChild: NgForm = {} as NgForm;
  addNewCardResult: string = '';
  @ViewChild('cardPersonFullNameLocalReference', {static: true}) cardPersonFullNameLocalReferenceViewChild: ElementRef = {} as ElementRef;

  
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {

    // Pone el foco en el campo cardPersonFullName al carga el formulario
    this.cardPersonFullNameLocalReferenceViewChild.nativeElement.focus();

    // - Add New Card Form
    this.addNewCardForm = new FormGroup({
      // Controles: 'name_del_control': new FormControl(valor_inicial, validadores_normales, validadores_asincronos)
      // Validadores de Angular (Reactive approach): usar estos métodos en el TS: https://angular.io/api/forms/Validators
      /* Comprobación de validadores:
          - Clases ng-valid y ng-invalid en el control
          - Objeto JS del form: addNewCardForm.controls.name_o_ruta_del_control.errors. En addNewCardForm.errors no aparece.
      */
      'cardPersonFullName'  : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'cardNumber'          : new FormControl(null, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
      'cardExpirationMonth' : new FormControl(1, [Validators.required]),  // Por defecto, selecciono el primer mes (enero)
      'cardExpirationYear'  : new FormControl(this.currentYear, [Validators.required]),  // null si quiero que el campo esté vacío inicialmente
    });

    // - Status Observable: guardar los valores de los campos en la Addreses Store (si se ha rellenado el formulario completo y correctamente)
    this.addNewCardForm.statusChanges.subscribe(
      (statusChanges) => {

        // Comprobación
        // console.log('statusChanges (VALID | INVALID | PENDING): ' + statusChanges);

        if ( statusChanges === 'VALID') {
          
          // Comprobación
          // console.log('Valores del formulario: ' + this.addNewCardForm.get('address')?.value + ' - ' + this.addNewCardForm.get('postalCode')?.value + ' - ' + this.addNewCardForm.get('city')?.value + ' - ' + this.addNewCardForm.get('countryId')?.value + ' - ' + this.addNewCardForm.get('fullName')?.value);
          
          // Guardar los valores de los campos en la Payment Method Store
          let bankNames: ('Bank of America' | 'Goldman Sachs' | 'Citigroup' | 'Wells Fargo' | 'Capital One Financial')[] = ['Bank of America', 'Goldman Sachs', 'Citigroup', 'Wells Fargo', 'Capital One Financial'];
          this.store.dispatch( PaymentMethodsActions.SaveNewCardToStore({
            newCardPayload: {
              type                : 'card',
              cardBankName        : bankNames[Math.floor(Math.random() * 5)], // Aleatoriamente: 'Bank of America' | 'Goldman Sachs' | 'Citigroup' | 'Wells Fargo' | 'Capital One Financial'
              cardPersonFullName  : this.addNewCardForm.get('cardPersonFullName')?.value,
              cardNumber          : this.addNewCardForm.get('cardNumber')?.value,
              cardExpirationMonth : this.addNewCardForm.get('cardExpirationMonth')?.value,
              cardExpirationYear  : this.addNewCardForm.get('cardExpirationYear')?.value,
              cardType            : ( ( Math.round(Math.random()) == 1 ) ? 'visa' : 'mastercard' ), // Aleatoriamente: "visa" | "mastercard"
            }
          }) );

        }

      }
    );

  }

  /* onSubmit() {

    // Comprobación
    console.log('addNewCardForm:');
    console.log(this.addNewCardForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.addNewCardForm.reset();

  } */

}
