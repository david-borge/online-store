import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import * as fromApp from '../../../../../core/store/app.reducer';  // el fromNombreComponente es una convención de NgRx
import * as AddressesActions from '../../store/addresses.actions';

import { GetAddressesPHPInterface } from 'projects/web/src/app/core/models/getAddressesPHP.interface';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  host: {
    class:'app-addresses--class-for-router-outlet',
  },
})
export class AddressesComponent implements OnInit {

  // Suscripciones a la Store
  addressesReducerObservableSubscription: Subscription = Subscription.EMPTY;

  // Template variables
  addresses: GetAddressesPHPInterface["addresses"] = [];
  showBottomOverlay: boolean = false;


  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {

    // Leer datos de la Global Store
    let userEmail = '';
    this.store.select("globalReducerObservable").subscribe(
      globalReducerData => {

        // Recuperar el email del usuario desde la Global Store
        userEmail = globalReducerData.user.email;

        // Leer las propiedades de BottomOverlay de la Global Store
        this.showBottomOverlay = globalReducerData.showBottomOverlay;

      }
    );

    // Recuperar los datos de la Order de la Base de Datos y guardarlos en la Store
    this.store.dispatch( AddressesActions.GetAddressesStart() );

    // Leer los datos de la Order de la Store para mostrarlos en la Template
    this.addressesReducerObservableSubscription = this.store.select('addressesReducerObservable').subscribe(
      addressesReducerData => {

        this.addresses = addressesReducerData.addresses;

        // Comprobacion
        // console.log('addresses:');
        // console.log(this.addresses);

      }
    );

  }

  ngOnDestroy(): void {

    // Cancelar suscripciones
    this.addressesReducerObservableSubscription.unsubscribe();

  }

}
