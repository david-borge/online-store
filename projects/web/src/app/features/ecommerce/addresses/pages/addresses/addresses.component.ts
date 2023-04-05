import { Component } from '@angular/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  host: {
    class:'app-addresses-classes-for-router-outlet'
  },
})
export class AddressesComponent {

  // TODO:
  numberOfAddresses :number = 3;

}
