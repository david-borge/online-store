import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bottom-overlay',
  templateUrl: './bottom-overlay.component.html',
  styleUrls: ['./bottom-overlay.component.scss']
})
export class BottomOverlayComponent {

  // Propiedades - Bottom Overlay
  @Input() bottomOverlayTitle         :string  = '';
  @Input() bottomOverlayAddButtonText :string  = '';

  @Output() clickOnCerrarBottomOverlayBtnEventEmitter = new EventEmitter<null>();

}
