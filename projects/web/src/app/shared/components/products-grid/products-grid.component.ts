import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../core/models/product.interface';

@Component({
    standalone: false,
    selector: 'app-products-grid',
    templateUrl: './products-grid.component.html',
    styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {
    @Input() productsList = {} as ProductInterface[];
    @Input() productCardProductNameTitleHeadingTag: string = '';
}
