import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Propiedades - Header Tag - Tipo
  @Input() headerTagType :string = 'overlay-header-main-page';
  
  // Propiedades - Header Tag - Título
  @Input() overlayHeaderPageTitle           :string  = 'Subpage Title';
  
  // Propiedades - Header Tag - Tipo: overlay-header-main-page


  // Propiedades - Header Tag - Tipo: overlay-header-subpage
  @Input() overlayHeaderSubpageShowCloseIcon   :boolean = false;
  @Input() overlayHeaderSubpageBackgroundColor :string = 'inherit';
  @Input() overlayHeaderSubpageShowLeftIcon    :boolean = true;


  constructor(
    public router: Router,
    private _location: Location
  ) {}

  // Go Back (with browser history)
  onClickGoBack(): void {
    this._location.back();
  }

}
