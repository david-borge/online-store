import {
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    inject,
} from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, NgForm, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { ProcessStatus } from '@core/models/processStatus.enum';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as PaymentMethodsActions from '@features/ecommerce/payment-methods/store/payment-methods.actions';

@Component({
    standalone: false,
    selector: 'app-add-new-card-form',
    templateUrl: './add-new-card-form.component.html',
    styleUrls: ['./add-new-card-form.component.scss'],
})
export class AddNewCardFormComponent implements OnInit, OnDestroy {
    private readonly store = inject<Store<fromApp.AppState>>(Store);

    // Suscripciones a la Store
    paymentMethodsReducerObservableSubscription: Subscription = Subscription.EMPTY;

    // Variables para la Template
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();

    // Variables del formulario
    addNewCardForm: FormGroup = new FormGroup({}); // Objecto JS que contiene el formulario creado programáticamente
    @ViewChild('addNewCardFormRef') addNewCardFormViewChild: NgForm = {} as NgForm;
    addNewCardResult = '';
    @ViewChild('cardPersonFullNameLocalReference', { static: true })
    cardPersonFullNameLocalReferenceViewChild: ElementRef = {} as ElementRef;
    addNewCardStatus: ProcessStatus = ProcessStatus.NOT_STARTED;
    @Output() isAddNewCardFormValidEventEmitter = new EventEmitter<FormControlStatus>();

    ngOnInit(): void {
        // Pone el foco en el campo cardPersonFullName al carga el formulario
        this.cardPersonFullNameLocalReferenceViewChild.nativeElement.focus();

        // - Leer la Payment Methods Store
        this.paymentMethodsReducerObservableSubscription = this.store
            .select('paymentMethodsReducerObservable')
            .subscribe((paymentMethodsReducerData) => {
                // addNewCardStatus
                this.addNewCardStatus = paymentMethodsReducerData.addNewCardStatus;

                // Disable the form inputs if the add new card process is being done
                if (this.addNewCardStatus === ProcessStatus.STARTED) {
                    this.addNewCardForm.disable();
                }
            });

        // - Add New Card Form
        this.addNewCardForm = new FormGroup(
            {
                // Controles: 'name_del_control': new FormControl(valor_inicial, validadores_normales, validadores_asincronos)
                // Validadores de Angular (Reactive approach): usar estos métodos en el TS: https://angular.io/api/forms/Validators
                /* Comprobación de validadores:
          - Clases ng-valid y ng-invalid en el control
          - Objeto JS del form: addNewCardForm.controls.name_o_ruta_del_control.errors. En addNewCardForm.errors no aparece.
      */
                cardPersonFullName: new FormControl(null, Validators.required), // null si quiero que el campo esté vacío inicialmente
                cardNumber: new FormControl(null, Validators.required), // null si quiero que el campo esté vacío inicialmente
                cardExpirationMonth: new FormControl(this.currentMonth, Validators.required), // Por defecto, selecciono el mes actual
                cardExpirationYear: new FormControl(this.currentYear, Validators.required), // Por defecto, selecciono el año actual
            },
            { validators: this.cardExpirationDateValidator() },
        );

        // - Status Observable: guardar los valores de los campos en la Addreses Store (si se ha rellenado el formulario completo y correctamente)
        this.addNewCardForm.statusChanges.subscribe((statusChanges) => {
            // Comprobación
            // console.log('statusChanges (VALID | INVALID | PENDING): ' + statusChanges);

            // Enviar el estado del formulario a BottomOverlayComponent para poder desactivar el botón "Add card" apropiadamente
            this.isAddNewCardFormValidEventEmitter.emit(statusChanges);

            // Si el formulario es válido, guardar los valores de los campos en la Addreses Store
            if (statusChanges === 'VALID') {
                // Comprobación
                // console.log('Valores del formulario: ' + this.addNewCardForm.get('address')?.value + ' - ' + this.addNewCardForm.get('postalCode')?.value + ' - ' + this.addNewCardForm.get('city')?.value + ' - ' + this.addNewCardForm.get('countryId')?.value + ' - ' + this.addNewCardForm.get('fullName')?.value);

                // Guardar los valores de los campos en la Payment Method Store
                const bankNames: (
                    | 'Bank of America'
                    | 'Goldman Sachs'
                    | 'Citigroup'
                    | 'Wells Fargo'
                    | 'Capital One Financial'
                )[] = [
                    'Bank of America',
                    'Goldman Sachs',
                    'Citigroup',
                    'Wells Fargo',
                    'Capital One Financial',
                ];
                this.store.dispatch(
                    PaymentMethodsActions.SaveNewCardToStore({
                        newCardPayload: {
                            type: 'card',
                            cardBankName: bankNames[Math.floor(Math.random() * 5)], // Aleatoriamente: 'Bank of America' | 'Goldman Sachs' | 'Citigroup' | 'Wells Fargo' | 'Capital One Financial'
                            cardPersonFullName:
                                this.addNewCardForm.get('cardPersonFullName')?.value,
                            cardNumber: this.addNewCardForm.get('cardNumber')?.value,
                            cardExpirationMonth:
                                this.addNewCardForm.get('cardExpirationMonth')?.value,
                            cardExpirationYear:
                                this.addNewCardForm.get('cardExpirationYear')?.value,
                            cardType: Math.round(Math.random()) == 1 ? 'visa' : 'mastercard', // Aleatoriamente: "visa" | "mastercard"
                        },
                    }),
                );
            }
        });
    }

    /* onSubmit() {

    // Comprobación
    console.log('addNewCardForm:');
    console.log(this.addNewCardForm);  // Esto no hace falta con la extensión Angular DevTools de Chrome (SOLO a partir de Angular v12) (https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)

    // Reestablecer el form
    // CUIDADO: esta línea hace que los valores no salgan bien la comprobación anterior
    // this.addNewCardForm.reset();

  } */

    ngOnDestroy(): void {
        this.paymentMethodsReducerObservableSubscription.unsubscribe();
    }

    // Card Expiration Date Validator: the introduced date is greater or equal than the current one
    // OpenAI Generated Code
    cardExpirationDateValidator(): any {
        return (formGroup: FormGroup): Record<string, any> | null => {
            const currentDate = new Date();
            // TODO: unsed variables
            const currentMonth = currentDate.getMonth() + 1; // Adding 1 since months are zero-based
            const currentYear = currentDate.getFullYear();

            const expirationMonthControl = formGroup.get('cardExpirationMonth');
            const expirationYearControl = formGroup.get('cardExpirationYear');

            if (!expirationMonthControl || !expirationYearControl) {
                return null; // Skip validation if the controls are not present
            }

            const expirationMonth = +expirationMonthControl.value + 1; // Convert to number. Sumar 1 porque en cardExpirationMonth cuento los meses desde 1, no desde 0
            const expirationYear = +expirationYearControl.value; // Convert to number

            // Convert the selected month and year to a JavaScript Date object
            const selectedDate = new Date(expirationYear, expirationMonth - 1);

            // Check if the selected date is greater than or equal to the current date
            if (selectedDate < currentDate) {
                expirationMonthControl.setErrors({ futureDate: true });
                expirationYearControl.setErrors({ futureDate: true });
                return { futureDate: true };
            }

            expirationMonthControl.setErrors(null);
            expirationYearControl.setErrors(null);
            return null;
        };
    }
}
