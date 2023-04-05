import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss']
})
export class SelectButtonComponent {

  // Propiedades - Credit Card
  @Input() selectButtonSelected :boolean = false;

}
