/*
  *** Authentication Service ***
  Proceso de Autentificación (Sign Up / Log In): https://docs.google.com/document/d/1QQ8aXD48xA9Iu7Uhvps1r2fUzNcRCpd5X_n41F0AiPU/edit?usp=sharing
*/

import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { take } from 'rxjs';

import { CookiesService } from '@core/services/cookies/cookies.service';
import * as fromApp from '@core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as GlobalActions from '@core/store/global.actions';
import * as AddressesActions from '@features/ecommerce/addresses/store/addresses.actions';
import * as CartActions from '@features/ecommerce/cart/store/cart.actions';
import * as OrderActions from '@features/ecommerce/order/store/order.actions';
import * as OrdersActions from '@features/ecommerce/orders/store/orders.actions';
import * as PaymentMethodsActions from '@features/ecommerce/payment-methods/store/payment-methods.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private store = inject<Store<fromApp.AppState>>(Store);
    private cookiesService = inject(CookiesService);

    // Duración de las cookies de autentificación (authToken, authExpirationDate, authEmail)
    logInDuration = 7;

    // Authentication - Comprobar si el usuario está logueado (leer la cookie “auth”, guardar su valor en la Global Store y ajustar el valor de loggedIn de la Global Store acordemente)
    checkIfUserIsLoggedIn(): boolean {
        let loggedIn = false;
        let fechaCookieAuthCaducada = true;
        let authEmailCookieValue: string | null = '';
        let authTokenCookieValue: string | null = '';

        // - Leer la cookie “auth” y guardar su valor en la Global Store
        this.store.dispatch(GlobalActions.GetAuthTokenAndAuthExpirationDateCookiesValuesStart());

        // - Comprobar si estoy logueado en la app: comprobar el valor de Global Store > authTokenCookieValue
        // Si authTokenCookieValue no es "" y si la fecha no está caducada (ahora es menor que la fecha de la cookie): Global Store: loggedIn = true
        this.store
            .select('globalReducerObservable')
            .pipe(take(1))
            .subscribe((globalReducerData) => {
                // Comprobación
                // console.log('Fecha actual: ' + new Date());
                // console.log('authTokenCookieValue: ' + globalReducerData.authTokenCookieValue);
                // console.log('authExpirationDateCookieValue: ' + globalReducerData.authExpirationDateCookieValue);

                // Si authExpirationDateCookieValue y authTokenCookieValue no son ""
                // Cuidado: no hay que añadir authEmail a este if porque los usuarios temporales no tienen cookie authEmail, pero sí authExpirationDate y authToken
                if (
                    globalReducerData.authExpirationDateCookieValue != null &&
                    globalReducerData.authExpirationDateCookieValue != '' &&
                    globalReducerData.authTokenCookieValue != null &&
                    globalReducerData.authTokenCookieValue != ''
                ) {
                    // Si la fecha no está caducada (ahora es menor que la fecha de la cookie)
                    if (new Date() < new Date(globalReducerData.authExpirationDateCookieValue)) {
                        // Comprobación
                        // console.log('La fecha de la cookie "authExpirationDate" no está caducada (ahora es menor que la fecha de la cookie).');

                        // Comprobar si la fecha está caducada
                        fechaCookieAuthCaducada = false;

                        authEmailCookieValue = globalReducerData.authEmailCookieValue;
                        authTokenCookieValue = globalReducerData.authTokenCookieValue;

                        loggedIn = true;
                    }
                }
            });

        // - Si la fecha no está caducada (ahora es menor que la fecha de la cookie): Global Store: loggedIn = true
        if (!fechaCookieAuthCaducada) {
            this.store.dispatch(
                GlobalActions.LogInStart({
                    emailPayload: authEmailCookieValue,
                    passwordPayload: '',
                    lastLoginFullDatePayload: '',
                    tokenPayload: authTokenCookieValue,
                }),
            );
            // [No usado] this.store.dispatch( GlobalActions.SetLoggedInToTrue() );
        }

        return loggedIn;
    }

    // Authentication - Sign Up (Registro)
    signUp(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        signUpFullDate: string,
        lastLoginFullDate: string,
        token: string,
    ) {
        // Comprobación
        // console.log('AuthService > Sign Up');

        this.store.dispatch(
            GlobalActions.SignUpStart({
                firstNamePayload: firstName,
                lastNamePayload: lastName,
                emailPayload: email,
                passwordPayload: password,
                signUpFullDatePayload: signUpFullDate,
                lastLoginFullDatePayload: lastLoginFullDate,
                tokenPayload: token,
            }),
        );
    }

    // Authentication - Log In (Iniciar sesión)
    logIn(email: string, password: string, lastLoginFullDate: string, token: string) {
        // Comprobación
        // console.log('AuthService > Log In');

        this.store.dispatch(
            GlobalActions.LogInStart({
                emailPayload: email,
                passwordPayload: password,
                lastLoginFullDatePayload: lastLoginFullDate,
                tokenPayload: token, // El authToken cambia cada vez que se inicia y se cierra la sesión. Es único para cada usuario.
            }),
        );
    }

    authMessages(messageCode: string): string {
        switch (messageCode) {
            case 'SIGNUP_ERROR_HTTP_REQUEST_FAILED':
                return 'There was a problem signing up. Please try again.';

            case 'LOGIN_ERROR_HTTP_REQUEST_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: catch (Exception $e)
            case 'LOGIN_ERROR_LASTLOGINFULLDATE_UPDATE_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_LASTLOGINFULLDATE_UPDATE_FAILED',
            case 'LOGIN_ERROR_GET_USER_DATA_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_GET_USER_DATA_FAILED',
            case 'LOGIN_ERROR_GET_ACTIVE_ORDERS_DATA_FAILED': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_GET_ACTIVE_ORDERS_DATA_FAILED',
                return 'There was a problem loggin in. Please try again.';

            case 'SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > signup.php > Línea: exit("SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD");
                return "The Sign Up API didn't recieve its payload.";

            case 'LOGIN_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: exit("SIGNUP_ERROR_API_DID_NOT_RECIEVE_ITS_PAYLOAD");
                return "The Log In API didn't recieve its payload.";

            case 'LOGIN_ERROR_API_DID_NOT_RECIEVE_THE_EMAIL_OR_THE_TOKEN_IN_THE_PAYLOAD': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_API_DID_NOT_RECIEVE_THE_EMAIL_OR_THE_TOKEN_IN_THE_PAYLOAD',
                return "The Log In API didn't recieve the email or the token in the payload.";

            case 'LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_EMAIL_DOES_NOT_EXIST_IN_THE_DATABASE',
            case 'LOGIN_ERROR_PASSWORD_IS_NOT_CORRECT': // Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => true,
                return 'El email o la contraseña no es correcto.'; // Por temas de privacidad y seguridad, no digo al usuario que si el problema es que el email no existe o si es que la contraseña no es correcta

            case 'SQLSTATE[23000]': // Ver https://github.com/david-borge/online-store-backend > signup.php > Línea: catch (Exception $e)
                return 'Este email ya existe.';

            case 'LOGIN_ERROR_TOKEN_IS_NOT_CORRECT': // Elijo no mostrar ningún mensaje de error cuando se haga auto log out. Ver https://github.com/david-borge/online-store-backend > login.php > Línea: "resultado" => 'LOGIN_ERROR_TOKEN_IS_NOT_CORRECT',
            default:
                return '';
        }
    }

    // Log Out
    logOut() {
        // - Borrar cookies "authToken", "authExpirationDate" y "authEmail" y borrar datos de la Global Store (loggedIn = false; user; activeOrders)
        this.store.dispatch(GlobalActions.LogOutStart());

        // - Borrar datos de la Order Store (currentOrderNumber; orderData; orderProducts; orderAddress; orderPaymentMethod)
        this.store.dispatch(OrderActions.LogOut());

        // - Borrar datos de la Orders Store (orders)
        this.store.dispatch(OrdersActions.LogOut());

        // - Borrar datos de la Addresses Store (addresses; countries; getAllCountriesErrorMessage; newAddress; newAddressCountryName; addNewAddressErrorMessage)
        this.store.dispatch(AddressesActions.LogOut());

        // - Borrar datos de la PaymentMethods Store (paymentMethods, newCard, addNewCardErrorMessage)
        this.store.dispatch(PaymentMethodsActions.LogOut());

        // - Borrar datos de la Cart Store (cartData, getCartDataErrorMessage, updateProductQuantityErrorMessage, newProductSlug, newProductQuantity)
        this.store.dispatch(CartActions.LogOut());
    }

    // Generar cookies de autentificación: authToken, authExpirationDate, authEmail
    generateAuthTokenCookie(token: string) {
        this.cookiesService.ponerCookie('authToken', token, this.logInDuration);
    }

    generateAuthExpirationDateCookie() {
        this.cookiesService.ponerCookie(
            'authExpirationDate',
            this.addDays(new Date(), this.logInDuration).toString(),
            this.logInDuration,
        );
    }

    generateAuthEmailCookie(email: string) {
        this.cookiesService.ponerCookie('authEmail', email, this.logInDuration);
    }

    // Función auxiliar: Generar token de autentificación
    generateToken() {
        return this.rand() + this.rand(); // to make it longer
    }

    // Función auxiliar: generar código alfanumérico aleatorio
    rand() {
        return Math.random().toString(36).substr(2); // remove `0.`
    }

    // Función auxiliar: sumar días a una fecha
    addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
