import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProcessStatus } from '../../../core/models/processStatus.enum';

@Component({
    standalone: false,
    selector: 'app-btn-with-loading-spinner',
    templateUrl: './btn-with-loading-spinner.component.html',
    styleUrls: ['./btn-with-loading-spinner.component.scss'],
})
export class BtnWithLoadingSpinnerComponent implements OnInit {
    // Propiedades - Plantilla
    @Input() btnWithLoadingSpinnerText = '';
    @Input() btnWithLoadingSpinnerTextClasses = '';
    @Input() btnWithLoadingSpinnerClasses = '';
    @Input() btnWithLoadingSpinnerSpinnerWidthAndHeight = 0;
    @Input() btnWithLoadingSpinnerProcessStatus: ProcessStatus = ProcessStatus.NOT_STARTED;
    @Input() navigationShowButtonRightRightIcon = false;
    @Input() navigationShowButtonRightRightIconType = 'check';
    @Input() formIsValid = true;

    // Propiedades - Eventos
    @Output() onClickBtnWithLoadingSpinnerEventEmitter = new EventEmitter<void>(); // IMPORTANTE: si tipoDeEventDataONombreQueYoQuiera es un objeto (como {serverName: string, serverContent: string}) el nombre que de las propiedades del objeto aquí debe ser el mismo en el componente en el que recojo el evento emitido.

    // Propiedades - Propiedades CSS de <app-btn-with-loading-spinner>
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.width') width = '100%';

    currentURL = '';

    ProcessStatus = ProcessStatus;

    constructor(private router: Router) {}

    ngOnInit() {
        // - Leer en qué URL estoy
        this.currentURL = this.router.url;
    }

    onClickBtnWithLoadingSpinner() {
        this.onClickBtnWithLoadingSpinnerEventEmitter.emit();
    }
}
