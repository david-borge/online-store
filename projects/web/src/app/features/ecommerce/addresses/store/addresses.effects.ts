/*** AddressesEffects ***/

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromApp from '../../../../core/store/app.reducer'; // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from './addresses.actions';
import * as GlobalActions from '../../../../core/store/global.actions';

import { DataStorageService } from 'projects/web/src/app/core/services/data-storage/data-storage.service';
import { CookiesService } from 'projects/web/src/app/core/services/cookies/cookies.service';

import { CountryInterface } from 'projects/web/src/app/core/models/country.interface';
import { GetAddressesPHPInterface } from 'projects/web/src/app/core/models/getAddressesPHP.interface';

@Injectable() // Para que podamos inyectar cosas en esta class, como actionsObservable y httpClient en el constructor. Nota: aquí NO añadir el providedIn nunca.
export class AddressesEffects {
    // La idea es ejecutar cualquier código (como HTTP Request o LocalStorage) que deba ocurrir cuando se ejecute la acción asociada al Side Effect y, después, dispatch una nueva Action

    constructor(
        // actionsObservable o actions$ es un Observable grande que contiene todas las dispatched Actions para que podamos reaccionar a ellas.
        // Notación: se le puede añadir un $ al final del nombre indica que es un Observable, pero no es obligatorio. Yo prefiero poner la palabra Observable.
        private actionsObservable: Actions,
        private dataStorageService: DataStorageService,
        private store: Store<fromApp.AppState>,
        private cookiesService: CookiesService,
    ) {}

    // Side Effect de la Get Addresses Start Action de Addresses
    getAddressesSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(AddressesActions.GetAddressesStart),

            withLatestFrom(this.store.select('addressesReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getAddressesStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getAddressesStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getAddressesStartActionData:');
                // console.log(getAddressesStartActionData);

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .getAddressesHttpRequest(this.cookiesService.leerUnaCookie('authToken'))
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getAddressesHttpRequestResponse: GetAddressesPHPInterface) => {
                            // Comprobación
                            // console.log('getAddressesSideEffect - getAddressesHttpRequestResponse:');
                            // console.log(getAddressesHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                AddressesActions.GetAddressesEndSuccess({
                                    addressesPayload: getAddressesHttpRequestResponse.addresses,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getAddressesSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                AddressesActions.GetAddressesEndFailure({
                                    getAddressesErrorMessagePayload:
                                        'There was an error when loading the Addresses data.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Get All Countries Start Action de Addresses
    getAllCountriesSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(AddressesActions.GetAllCountriesStart),

            withLatestFrom(this.store.select('addressesReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((getAllCountriesStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: getAllCountriesStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('getAllCountriesStartActionData:');
                // console.log(getAllCountriesStartActionData);

                // Hacer la HTTP Request si NO se ha hecho ya
                if (getAllCountriesStartActionData[0].countries.length == 0) {
                    // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                    return this.dataStorageService.getAllCountriesHttpRequest().pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                        debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                        Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((getAddressesHttpRequestResponse: CountryInterface[]) => {
                            // Comprobación
                            // console.log('getAddressesSideEffect - getAddressesHttpRequestResponse:');
                            // console.log(getAddressesHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                AddressesActions.GetAllCountriesEndSuccess({
                                    allCountriesPayload: getAddressesHttpRequestResponse,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('getAllCountriesSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                AddressesActions.GetAllCountriesEndFailure({
                                    getAllCountriesErrorMessagePayload:
                                        'There was an error when loading the Country list.',
                                }),
                            );
                        }),
                    );
                }

                // Si la HTTP Request ya se había hecho, devolver las countries que ya había en la Store
                else {
                    return of(
                        // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                        AddressesActions.GetAllCountriesEndSuccess({
                            allCountriesPayload: getAllCountriesStartActionData[0].countries,
                        }),
                    );
                }
            }),
        ),
    );

    // Side Effect de la Add New Address Start Action de Addresses
    addNewAddressSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(AddressesActions.AddNewAddressStart),

            withLatestFrom(this.store.select('addressesReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((addNewAddressStartActionData) => {
                // Aquí puedo usar los datos del payload de la Action: addNewAddressStartActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('addNewAddressStartActionData:');
                // console.log(addNewAddressStartActionData);

                // console.log('authTokenCookieValue: ' + this.cookiesService.leerUnaCookie('authToken'));

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .addNewAddressHttpRequest(
                        addNewAddressStartActionData[0].newAddressPayload,
                        this.cookiesService.leerUnaCookie('authToken'),
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((addNewAddressHttpRequestResponse) => {
                            // Comprobación
                            // console.log('addNewAddressSideEffect - addNewAddressHttpRequestResponse:');
                            // console.log(addNewAddressHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                AddressesActions.AddNewAddressEndSuccess({
                                    newAddressId: 0,
                                    addNewAddresSuccessPayload: {
                                        id: addNewAddressHttpRequestResponse, // newAddressId
                                        fullName:
                                            addNewAddressStartActionData[0].newAddressPayload
                                                .fullName,
                                        address:
                                            addNewAddressStartActionData[0].newAddressPayload
                                                .address,
                                        postalCode:
                                            addNewAddressStartActionData[0].newAddressPayload
                                                .postalCode,
                                        city: addNewAddressStartActionData[0].newAddressPayload
                                            .city,
                                        country:
                                            addNewAddressStartActionData[0]
                                                .newAddressCountryNamePayload,
                                        isDefault: 1,
                                    } as GetAddressesPHPInterface['addresses'][0],
                                    // addNewAddresSuccessPayload: addNewAddressStartActionData[0].newAddressPayload,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('addNewAddressSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                AddressesActions.AddNewAddressEndFailure({
                                    addNewAddressErrorMessagePayload:
                                        'There was an error when loading the Country list.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );

    // Side Effect de la Add New Address End Success Action de Addresses
    addNewAddressEndSuccessSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            ofType(AddressesActions.AddNewAddressEndSuccess),
            map(() => {
                return GlobalActions.ShowOrHideBottomOverlay({ showBottomOverlayValue: false });
            }),
        ),
    );

    // Side Effect de la Change Default Address Start Action de Addresses
    changeDefaultAddressSideEffect = createEffect(() =>
        this.actionsObservable.pipe(
            // Cuidado: las Actions son Observables, pero no hace falta llamar a subscribe() al definir los Side Effects, eso lo hace NgRx automáticamente. Llamar solo a pipe().

            // ofType() es un Operator que nos permite decidir que tipos de Side Effects quiero ejecutar en este Observable stream.
            // Es decir, SÓLO ejecutar este Side Effect si la Action una de las definidas dentro de ofType().
            ofType(AddressesActions.ChangeDefaultAddressStart),

            withLatestFrom(this.store.select('addressesReducerObservable')),

            // switchMap() nos permite crear un nuevo Observable tomando los datos de otro Observable
            switchMap((changeDefaultAddressActionData) => {
                // Aquí puedo usar los datos del payload de la Action: changeDefaultAddressActionData.nombrePayloadPayload.propiedad1

                // Comprobación
                // console.log('changeDefaultAddressActionData:');
                // console.log(changeDefaultAddressActionData);

                // console.log('authTokenCookieValue: ' + this.cookiesService.leerUnaCookie('authToken'));

                // CUIDADO: poner el tipo de llamada (get, post...) y el tipo de dato que devuelve apropiadamente.
                return this.dataStorageService
                    .changeDefaultAddress(
                        this.cookiesService.leerUnaCookie('authToken'),
                        changeDefaultAddressActionData[0].addressCardIdPayload,
                    )
                    .pipe(
                        /* Si, después de hacer el Side Effect, quiero modificar el App State (que es lo normal),
                    debo devolver una nueva Action (NombreActionEnd) para que el Observable stream iniciado en la acción pueda terminar.
                    Aunque lo que hay que devolver, en realidad, es un Observable, que NgRx tratará como una Action automáticamente (recuerda que los Actions son Observables). */

                        switchMap((changeDefaultAddressHttpRequestResponse) => {
                            // Comprobación
                            // console.log('changeDefaultAddressSideEffect - changeDefaultAddressHttpRequestResponse:');
                            // console.log(changeDefaultAddressHttpRequestResponse);

                            // Procesamiento de datos si es necesario...

                            return of(
                                // Procesar datos si es necesario...

                                // Nueva Action que NgRx dispachtea automáticamente (NombreActionEnd), con su payload correspondiente
                                AddressesActions.ChangeDefaultAddressEndSuccess({
                                    addressArrayIdPayload:
                                        changeDefaultAddressActionData[0].addressArrayIdPayload,
                                }),
                            );
                        }),
                        catchError((errorResponse) => {
                            // Error handling code...

                            // Mostrar el error en la consola
                            console.log('changeDefaultAddressSideEffect - errorResponse:');
                            console.log(errorResponse);

                            // MUY IMPORTATE: aquí hay que devolver una non-error Observable so our Observable stream never dies.
                            return of(
                                AddressesActions.ChangeDefaultAddressEndFailure({
                                    changeDefaultAddressErrorMessagePayload:
                                        'There was an error when changing the selected address.',
                                }),
                            );
                        }),
                    );
            }),
        ),
    );
}
