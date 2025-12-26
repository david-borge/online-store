import { Component, Input } from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-date-with-title',
    templateUrl: './date-with-title.component.html',
    styleUrls: ['./date-with-title.component.scss'],
})
export class DateWithTitleComponent {
    // Propiedades - Date with Title
    @Input() dateWithTitleTitle = '';
    @Input() dateWithTitleDate = '';
}
