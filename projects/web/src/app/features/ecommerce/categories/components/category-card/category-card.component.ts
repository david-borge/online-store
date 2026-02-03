import { Component, Input } from '@angular/core';

import { CategoryInterface } from '@core/models/category.interface';

@Component({
    standalone: false,
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
    // FIXME: hacer la comprobación de que este valor ya se ha recibido en la API, porque si no, inicialmente no existe y salen errores en la consola, sale imagen que no existe y aumenta el CLS.
    @Input() category = {} as CategoryInterface;
}
