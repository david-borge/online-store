import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ProcessStatusInterface } from '../../../core/models/processStatus.interface';

@Component({
  selector: 'app-btn-with-loading-spinner',
  templateUrl: './btn-with-loading-spinner.component.html',
  styleUrls: ['./btn-with-loading-spinner.component.scss']
})
export class BtnWithLoadingSpinnerComponent {

  // Propiedades - Plantilla
  @Input() btnWithLoadingSpinnerText                 : string = '';
  @Input() btnWithLoadingSpinnerTextClasses          : string = '';
  @Input() btnWithLoadingSpinnerClasses              : string = '';
  @Input() btnWithLoadingSpinnerSpinnerWidthAndHeight: number = 0;
  @Input() btnWithLoadingSpinnerProcessStatus: ProcessStatusInterface['processStatus'] = 'NOT_STARTED';

  // Propiedades - Eventos
  @Output() onClickBtnWithLoadingSpinnerEventEmitter = new EventEmitter<void>();  // IMPORTANTE: si tipoDeEventDataONombreQueYoQuiera es un objeto (como {serverName: string, serverContent: string}) el nombre que de las propiedades del objeto aquí debe ser el mismo en el componente en el que recojo el evento emitido.

  // Propiedades - Propiedades CSS de <app-btn-with-loading-spinner>
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';

  onClickBtnWithLoadingSpinner() {
    this.onClickBtnWithLoadingSpinnerEventEmitter.emit();
  }

}
