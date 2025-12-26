import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryInterface } from 'projects/web/src/app/core/models/category.interface';

@Component({
    standalone: false,
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
    router = inject(Router);

    // FIXME: hacer la comprobación de que este valor ya se ha recibido en la API, porque si no, inicialmente no existe y salen errores en la consola, sale imagen que no existe y aumenta el CLS.
    @Input() category = {} as CategoryInterface;
}
